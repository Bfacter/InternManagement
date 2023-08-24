const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const candidateRegistrations = require('../models/candidate_registartions');

router.post('/', async (req, res) => {
  try {
    const { Email, password } = req.body;
  

    const candidate = await candidateRegistrations.findOne({ Email });


    if (!candidate) {
      
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const currentTime = new Date().getTime();
    if (candidate.loginLockUntil && currentTime < candidate.loginLockUntil) {
      // User is locked out
      const lockUntilTime = new Date(candidate.loginLockUntil).toLocaleString();
      return res.status(401).json({
        message: `You are locked out until ${lockUntilTime}. Please try again later.`,
      });
    }

    const passwordMatch = await bcrypt.compare(password, candidate.password);

    if (!passwordMatch) {
      candidate.loginAttempts += 1;

      if (candidate.loginAttempts >= 7) {
        // Set loginLockUntil to the current time + 24 hours
        const lockUntil = new Date();
        lockUntil.setHours(lockUntil.getHours() + 24);
        candidate.loginLockUntil = lockUntil;
        
        await candidate.save();
        
        return res.status(401).json({
          message: 'Incorrect password. You will be locked out for the next 24 hours.',
        });
      }

      await candidate.save();

      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If login is successful, reset loginAttempts and loginLockUntil
    candidate.loginAttempts = 0;
    candidate.loginLockUntil = null;
    await candidate.save();

    res.status(200).json({ message: 'Login successful', RID: candidate.RID });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;

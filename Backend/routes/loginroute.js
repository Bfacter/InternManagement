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
    const passwordMatch = await bcrypt.compare(password, candidate.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;

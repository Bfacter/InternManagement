// registration-backend/routes/registration.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const candidateRegistrations = require('../models/candidate_registartions');
const Counter = require('../models/counter');


router.post('/', async (req, res) => {
  try {
    const { Fname,Dob, Email, password, confirmPassword } = req.body;


    // Check if the password and confirmPassword match
    if (password != confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }


    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const counter = await Counter.findOneAndUpdate(
      { counterName: 'RID' },
      { $inc: { value: 1 } },
      { new: true, upsert: true } 
    );


    const newCandidate = new candidateRegistrations({
      RID: counter.value,
      Fname,
      Dob,
      Email,
      password: hashedPassword,
      ipAddress,
      statusofregistration:"a",
      time_of_registration: Date.now(),
    });



    await newCandidate.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error registering candidate', error: error.message });

  }
});

module.exports = router;

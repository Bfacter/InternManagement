const express = require("express");
const router = express.Router();
const LoginData = require("../models/logTable");

router.post("/", async (req, res) => {
  try {
    const { email, success, ipAddress, timestamp } = req.body;

    const loginData = new LoginData({
      email,
      success,
      ipAddress,
      timestamp,
    });

    await loginData.save();

    res.status(200).json({ message: "Login data saved successfully" });
  } catch (error) {
    console.error("Error saving login data:", error);
    res.status(500).json({ message: "Error saving login data" });
  }
});

module.exports = router;

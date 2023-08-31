const mongoose = require("mongoose");

const loginDataSchema = new mongoose.Schema({
  email: { type: String, required: true },
  success: { type: Boolean, required: true },
  ipAddress: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model("LoginData", loginDataSchema);

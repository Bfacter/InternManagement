const mongoose = require("mongoose");

const educationalQualificationSchema = new mongoose.Schema({
  RID: { type: Number, required: true }, // Assuming RID is a unique identifier for the person
  examination: { type: String, required: true },
  subject: { type: String, required: true },
  board: { type: String, required: true },
  syear: { type: String, required: true },
  cyear: { type: String, required: true },
  status: { type: String, required: true },
  percentage: { type: Number, required: true },
  semester: { type: String },
});

const EducationalQualification = mongoose.model(
  "EducationalQualification",
  educationalQualificationSchema
);

module.exports = EducationalQualification;

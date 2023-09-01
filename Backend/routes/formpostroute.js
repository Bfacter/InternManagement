const express = require("express");
const router = express.Router();
const formDetails = require("../models/candidate_form");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const generateUniqueNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

router.post("/", upload.single("resume"), async (req, res, next) => {
  try {
    const {
      RID,
      title,
      fathersname,
      address1,
      address2,
      city,
      country,
      pincode,
      phone,
      mobile,
      desiredMonth,
      AreaOptions,
      PlaceofSubmission,
    } = req.body;

    const resumeFileName = req.file.filename;
    // Generate the unique 8-digit number
    const uniqueNumber = generateUniqueNumber();

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Construct the RegNo based on the format
    const RegNo = `NITI${currentYear}${RID}${uniqueNumber}`;

    const newFormEntry = new formDetails({
      RID,
      RegNo,
      title,
      fathersname,
      address1,
      address2,
      city,
      country,
      pincode,
      phone,
      mobile,
      resume: resumeFileName,
      desiredMonth,
      AreaOptions,
      PlaceofSubmission,
    });

    await newFormEntry.save();
    res.status(200).json({ message: "Form data submitted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting form data", error: error.message });
  }
});

module.exports = router;

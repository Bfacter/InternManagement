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

router.post("/", upload.single("resume"), async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

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
    } = req.body;

    const resumeFileName = req.file.filename;

    const newFormEntry = new formDetails({
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
      resume: resumeFileName,
      desiredMonth,
      AreaOptions,
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

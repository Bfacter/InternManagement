const express = require("express");
const router = express.Router();
const EducationalQualification = require("../models/candidate_education");

router.post("/", async (req, res) => {
  try {
    const { RID, educationalQualifications } = req.body;

    // Delete existing educational qualifications for the provided RID
    await EducationalQualification.deleteMany({ RID });

    // Insert the new educational qualifications
    await EducationalQualification.insertMany(
      educationalQualifications.map((qualification) => ({
        RID,
        ...qualification,
      }))
    );

    res
      .status(200)
      .json({ message: "Educational qualifications saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving educational qualifications" });
  }
});

module.exports = router;

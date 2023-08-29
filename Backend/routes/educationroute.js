const express = require("express");
const router = express.Router();
const EducationalQualification = require("../models/candidate_education");

router.post("/", async (req, res) => {
  try {
    const { RID, educationalQualifications } = req.body;

    await EducationalQualification.deleteMany({ RID });

    const nonEmptyQualifications = educationalQualifications.filter(
      (qualification) => {
        return (
          qualification.examination ||
          qualification.subject ||
          qualification.board ||
          qualification.syear ||
          qualification.cyear ||
          qualification.status ||
          qualification.percentage
        );
      }
    );

    await EducationalQualification.insertMany(
      nonEmptyQualifications.map((qualification) => ({
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

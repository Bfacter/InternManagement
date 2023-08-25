const express = require("express");
const router = express.Router();
const candidateRegistrations = require("../models/candidate_registartions");

router.get("/:RID", async (req, res) => {
  try {
    const { RID } = req.params;
    const candidate = await candidateRegistrations.findOne({ RID: RID });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json({ candidate });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving data", error: error.message });
  }
});
module.exports = router;

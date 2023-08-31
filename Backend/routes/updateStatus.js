const express = require("express");
const router = express.Router();
const candidateRegistration = require("../models/candidate_registartions");
const { route } = require("./registrationroute");

router.post("/:RID", async (req, res) => {
  try {
    const { RID } = req.params;
    await candidateRegistration.updateOne(
      { RID },
      { statusofregistration: "d" }
    );
    return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});
module.exports = router;

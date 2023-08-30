const express = require("express");
const router = express.Router();
const candidateRegistered = require("../models/candidate_registartions");
const candidateForm = require("../models/candidate_form");
const educationData = require("../models/candidate_education");

router.get("/:RID", async (req, res) => {
  try {
    const { RID } = req.params;
    const candidate = await candidateRegistered.findOne({ RID: RID });
    const formCandidate = await candidateForm.findOne({ RID: RID });
    const educationCandidate = await educationData.findOne({ RID: RID });
  } catch {}
});

// routes/options.js
const express = require("express");
const router = express.Router();

const examinationOptionsSets = [
  ["Secondary(10th)"],
  ["Senior Secondary(12th)"],
  [
    "B.A",
    "B.Arch",
    "BBA",
    "BCA",
    "B.Com",
    "BDS",
    "BHM",
    "B.PHARMA",
    "B.Sc",
    "B.Tech/BE",
    "LLB",
    "MBBS",
    "DIPLOMA",
    "BVSC",
    "BHMS",
    "BAMS",
    "OTHER",
  ],
  [
    "CA",
    "CS",
    "ICWA",
    "INTEGRATED PG",
    "LLM",
    "M.A",
    "M.Arch",
    "M.Com",
    "M.ED",
    "M.PHARMA",
    "M.Sc",
    "M.Tech/ME",
    "MBA/PGDM",
    "MCA",
    "MS",
    "PG DIPLOMA",
    "MVSC",
    "MCM",
    "P.HD/DOCTORATE",
    "MPHIL",
    "PHD/Doctrate",
    "OTHER",
  ],
];

router.get("/", (req, res) => {
  const { row } = req.query;
  if (row >= 0 && row < examinationOptionsSets.length) {
    const options = examinationOptionsSets[row];
    res.json({ options });
  } else {
    res.status(400).json({ message: "Invalid row index" });
  }
});

module.exports = router;

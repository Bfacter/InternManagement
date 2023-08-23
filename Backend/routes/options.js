// routes/options.js
const express = require('express');
const router = express.Router();

const examinationOptions = [
    'Secondary(10th)',
    'Senior Secondary(12th)',
    'B.A',
    'B.Arch',
    'BBA',
    'BCA',
    'B.Com',
    'BDS',
    'BHM',
    'B.PHARMA',
    'B.Sc',
    'B.Tech/BE',
    'LLB',
    'MBBS',
    'DIPLOMA',
    'BVSC',
    'OTHER',
    'CA',
    'CS',
    'ICWA',
    'INTEGRATED PG',
    'LLM',
    'M.A',
    'M.Arch',
    'M.Com',
    'M.ED',
    'M.PHARMA',
    'M.Sc',
    'M.Tech/ME',
    'MBA/PGDM',
    'MCA',
    'MS',
    'PG DIPLOMA',
    'MVSC',
    'MCM',
    'OTHER',
    'P.HD/DOCTORATE',
    'MPHIL',
    'OTHER',
    'MPHIL',
    'PHD/Doctrate',
    'OTHER',
    'BHMS',
    'BAMS'
  // Add more options as needed
];

router.get('/', (req, res) => {
  res.json({ options: examinationOptions });
});

module.exports = router;

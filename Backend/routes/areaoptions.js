const express = require("express");
const router = express.Router();

const AreaOptions = [
  "Governance",
  "Mass Communications and Social Media",
  "Mining Sector",
  "Natural Resources, Enviroment & Forests",
  "Programme Monitoring & Evaluation",
  "Public Finances/ Budget",
  "Public Private Partnership",
  "Innovation & Entrepreneurship(Atal Innovation Mission)",
  "Education/ Human Resources Development",
  "Project appraisal and management",
  "Social Justice and Empowerment",
  "Sports and Youth development",
  "Tourism and culture",
  "Urbanization/ smart city",
  "Agriculture",
  "Data Management and Analysis",
  "Economics",
  "Energy Sector",
  "Foreign Trade/Commerce",
  "Health, Nutrition, Women and Child Development",
  "Industry",
  "Infrastructure Connectivity(Transportation)",
  "Rural Development and SDGs",
  "Science and Technology",
  "Skill Development & Employment",
  "Water Resources",
  "North Eastern States",
  "Aspirational Districts Programme",
];

router.get("/", (req, res) => {
  res.json({ options: AreaOptions });
});

module.exports = router;

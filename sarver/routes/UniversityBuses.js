const express = require("express");
const router = express.Router();
const UniversityBusesController = require("../controllers/UniversityBusesController")

router.get("/unisData", UniversityBusesController.unisData);
router.get("/uniData/:university_id", UniversityBusesController.uniData);
router.put("/updataUniData/:university_id", UniversityBusesController.updataUniData);
router.get("/uniStreetData/:university_id", UniversityBusesController.uniStreetData);
router.post("/addStreetData", UniversityBusesController.addStreetData);
router.post("/addUniData", UniversityBusesController.addUniData);
router.put("/editStreetData/:street_id", UniversityBusesController.editStreetData);

module.exports = router;
const express = require("express");
const router = express.Router();
const ContactUsDataController = require("../controllers/ContactUsDataController")

router.put("/contactData", ContactUsDataController.putContactData);
router.get("/getContactData", ContactUsDataController.getContactData);

module.exports = router;
const express = require("express");
const router = express.Router();
const ContactUsMessageController = require("../controllers/ContactUsMessageController")

router.post("/sendMessages", ContactUsMessageController.postContactMessages);
router.get("/getMessages", ContactUsMessageController.getContactMessages);
router.get("/getMessages/:id", ContactUsMessageController.getContactMessagesById);

module.exports = router;
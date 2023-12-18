const express = require("express");
const router = express.Router();
const aboutUsController = require("../controllers/AboutUsController")

router.put("/aboutUsData", aboutUsController.putAboutUs);
router.get("/getAboutUsData",aboutUsController.getAboutUs);


module.exports = router;
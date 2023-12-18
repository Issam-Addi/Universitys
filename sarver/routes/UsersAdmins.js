const express = require("express");
const router = express.Router();
const UsersAdminsController = require("../controllers/UsersAdminsController");

router.post("/AddNewUSer", UsersAdminsController.AddNewUSer);
router.post("/AddNewUSerWithgoogle", UsersAdminsController.AddNewUSerWithgoogle);
router.post("/checkUser", UsersAdminsController.checkUser);
router.post("/checkAdmin", UsersAdminsController.checkAdmin);
router.get("/allUsers", UsersAdminsController.allUsers);
router.get("/oneUser/:id", UsersAdminsController.userById);
router.put("/updateUserData/:id", UsersAdminsController.updateUserData);
router.put("/updateUserRole/:id", UsersAdminsController.updateUserRole);
router.put("/updateUserFlag/:id", UsersAdminsController.updateUserFlag);
router.post("/forgetPassword/sendPINCode", UsersAdminsController.sendPINCode);
router.post("/forgetPassword/checkUserPINCodeAndUpdatePassword", UsersAdminsController.checkUserPINCodeAndUpdatePassword);
router.put("/forgetPassword/saveNewPassword", UsersAdminsController.saveNewPassword);

module.exports = router;
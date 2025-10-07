const express = require("express");
const router = express.Router();
const authController =  require("../controller/authController");

router.post("/user/register",authController.registerUser);
router.post("/user/login",authController.loginUser);
router.get("/user/logout",authController.logout);




module.exports=router;
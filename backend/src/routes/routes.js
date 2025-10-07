const express = require("express");
const router = express.Router();
const authController =  require("../controller/authController");

//user auth Apis
router.post("/user/register",authController.registerUser);
router.post("/user/login",authController.loginUser);
router.get("/user/logout",authController.logoutUser);

//Food partner Apis
router.post("/food-partner/register",authController.registerFoodPartner);
router.post("/food-partner/login",authController.loginFoodPartner);
router.get("/food-partner/logout",authController.logoutFoodPartner);




module.exports=router;
const express = require("express");
const router = express.Router();
const foodController = require("../controller/foodController");
const authMiddleware = require("../Middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
    storage:multer.memoryStorage(),
})


//Protected Route 
router.post("/",authMiddleware.authFoodPartnerModel,upload.single("video"),foodController.createFood);
router.get("/",authMiddleware.authUserMiddleware,foodController.getFoodItems);




module.exports=router;
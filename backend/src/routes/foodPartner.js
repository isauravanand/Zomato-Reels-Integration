const express = require("express");
const authMiddleware = require("../Middlewares/auth.middleware");
const foodpartnercontroller = require("../controller/foodPartnerController");

const router = express.Router();

router.get("/:id",authMiddleware.authUserMiddleware,foodpartnercontroller.getFoodPartnerById)


module.exports = router;
const foodModel = require("../models/fooditem.model");
const {v4:uuid} = require("uuid");
const storageService = require("../Services/stroage.services");

async function createFood(req, res) {
  try {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodpartner: req.foodPartner._id,  // ✅ matches schema exactly
    });

    res.status(201).json({
      message: "Food Item Created",
      food: foodItem,
    });
  } catch (error) {
    console.error("Error creating food item:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

async function getFoodItems(req,res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        messgae:"Food Items Fetched Successfully",
        foodItems
    })
}


module.exports={
    createFood,
    getFoodItems,
}
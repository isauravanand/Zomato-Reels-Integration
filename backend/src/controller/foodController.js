const foodModel = require("../models/fooditem.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model")
const { v4: uuid } = require("uuid");
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

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});
  res.status(200).json({
    messgae: "Food Items Fetched Successfully",
    foodItems
  })
}



async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const userId = req.user._id;

    // Check if the user already liked this food
    const existingLike = await likeModel.findOne({
      food: foodId,
      user: userId,
    });

    let updatedFood;

    if (existingLike) {
      // 👎 Unlike (delete from DB)
      await likeModel.deleteOne({ _id: existingLike._id });

      // Decrease like count
      updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: -1 } },
        { new: true } // ✅ Return updated document
      );

      return res.status(200).json({
        success: true,
        liked: false,
        newLikeCount: updatedFood.likeCount || 0,
        message: "Unliked successfully",
      });
    } else {
      // 👍 Add like
      await likeModel.create({
        user: userId,
        food: foodId,
      });

      // Increase like count
      updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: 1 } },
        { new: true } // ✅ Return updated document
      );

      return res.status(200).json({
        success: true,
        liked: true,
        newLikeCount: updatedFood.likeCount || 0,
        message: "Liked successfully",
      });
    }
  } catch (error) {
    console.error("Error in likeFood:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}





async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId
  });

  let updatedFood;

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId
    });

    updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      { $inc: { saveCount: -1 } },
      { new: true } // 👈 return the updated document
    );

    return res.status(200).json({
      message: "Food unsaved successfully",
      newSaveCount: updatedFood.saveCount // 👈 send updated count
    });
  }

  await saveModel.create({
    user: user._id,
    food: foodId
  });

  updatedFood = await foodModel.findByIdAndUpdate(
    foodId,
    { $inc: { saveCount: 1 } },
    { new: true } // 👈 return the updated document
  );

  res.status(201).json({
    message: "Food saved successfully",
    newSaveCount: updatedFood.saveCount // 👈 send updated count
  });
}


async function getSaveFood(req, res) {

  const user = req.user;
  const savedFoods = await saveModel.find({ user: user._id }).populate('food');

  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({ message: "No saved foods found" });
  }

  res.status(200).json({
    message: "Saved foods retrieved successfully",
    savedFoods
  });

}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSaveFood
}
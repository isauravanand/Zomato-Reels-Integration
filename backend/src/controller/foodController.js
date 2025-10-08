const foodModel = require("../models/fooditem.model");
const {v4:uuid} = require("uuid");
const storageService = require("../Services/stroage.services");

async function createFood(req,res){
    const fileUploadResult =  await storageService.uploadFile(req.file.buffer,uuid())
    const foodItem = await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        vedio:fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })
    res.status(201).json({
        messgae:"Food Item Created",
        food:foodItem
    })

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
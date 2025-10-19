const foodPartnerModel = require("../models/foodPartner.model");
const foodModel = require("../models/fooditem.model");

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;
    // console.log("foodpartner id is " + foodPartnerId);

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodpartner = await foodModel.find({foodpartner:foodPartnerId});

    if (!foodPartner) {
        return res.status(404).json({
            message: "Food Partner not Found"
        })
    }
    res.status(200).json({
        message: "Food Partner Found SucessFully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems:foodItemsByFoodpartner
        }
    });
}



module.exports = {
    getFoodPartnerById
};
const foodPartnerModel = require("../models/foodPartner.model");

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;
    // console.log("foodpartner id is " + foodPartnerId);

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    if (!foodPartner) {
        return res.status(404).json({
            message: "Food Partner not Found"
        })
    }
    res.status(200).json({
        message: "Food Partner Found SucessFully",
        foodPartner
    });
}



module.exports = {
    getFoodPartnerById
};
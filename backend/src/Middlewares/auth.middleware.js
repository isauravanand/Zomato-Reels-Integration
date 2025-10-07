const foodPartnerModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerModel(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please Login First"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner;
        next();
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

module.exports = {
    authFoodPartnerModel,
}
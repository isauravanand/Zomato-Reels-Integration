const foodModel = require("../models/fooditem.model");

async function createFood(req,res){
    res.send("Food item Created")
    
}


module.exports={
    createFood,
}
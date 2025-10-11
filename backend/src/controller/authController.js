const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    // res.send("hii user");
    const { email, fullname, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User Already Exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        fullname,
        email,
        password: hashedPassword,
       
    })

    const token = jwt.sign({ id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token);
    res.status(201).json({
        message: "User Succesfully Registered",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const token = jwt.sign({ id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token);
    res.status(200).json({
        message: "User Logged in Successfully !",
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })
}


function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User Logged Out Successfully"
    })
}

async function registerFoodPartner(req, res) {
    const { email, name, password, phone, address, contactName } = req.body;

    const isUserAlreadyExists = await foodPartnerModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.send(400).json({
            message: "Food Partner Account Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        address,
        phone,
        contactName,
    });

    const token = jwt.sign({ id: foodPartner._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token);
    res.status(201).json({
        message: "Food Partner Account Registered Succesfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            address:foodPartner.address,
            phone:foodPartner.phone,
            contactName:foodPartner.contactName

        }
    })


}

async function loginFoodPartner(req,res){
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const token = jwt.sign({ id: foodPartner._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token);
    res.status(200).json({
        message: "Food Partner Logged in Successfully !",
        user: {
            id: foodPartner._id,
            email: foodPartner.email,
            name:foodPartner.name
        }
    })
}

function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Food Partner Logged Out Successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
}
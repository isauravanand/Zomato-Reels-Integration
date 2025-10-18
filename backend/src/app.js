//Server Created
const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/auth");
const foodRoutes = require("./routes/food");
const foodPartner = require("./routes/foodPartner")
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.use("/api/auth",authRoutes);
app.use("/api/food",foodRoutes);
app.use("/api/food-partner", foodPartner);

module.exports=app;
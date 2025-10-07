//Server Created
const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());



app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.use("/api/auth",authRoutes);

module.exports=app;
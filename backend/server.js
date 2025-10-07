require("dotenv").config({path:"./src/.env"});
const app = require("./src/app");
const connectDb=require("./src/DB/db");

connectDb();

app.listen(process.env.PORT,()=>{
    console.log("App is Running");
})

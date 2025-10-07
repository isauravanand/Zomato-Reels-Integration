const mongoose = require("mongoose");

async function DatabaseConnect () {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.log("Database coonection Failed",err);
    })

}


module.exports=DatabaseConnect;
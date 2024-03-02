const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    type: String

})

const userModel = mongoose.model("user", userModelSchema);
module.exports=userModel;
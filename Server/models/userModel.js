const mongoose = require("mongoose")
// const addressSchema = require("./InnerModels/addressModel")
const userSchema = new mongoose.Schema({
    firstName:{
       type:String,
       require:true     
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        uniqe:true
    },
    phoneNumber:{
        type:String,
    },
    role:{
        type:String,
        enum:["manager","customer"],
        default:"customer"
    },
    password:{
        type:String,
        require:true
    }
},{})

module.exports = mongoose.model("User",userSchema)
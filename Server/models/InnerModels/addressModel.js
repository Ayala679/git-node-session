const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    country:{
        type:String,
        require:true,
        default:"Israel"
    },
    city:{
        type:String,
        require:true,
    },
    street:{
        type:String,
        require:true,
    },
    num:{
        type:Number,
        require:true,
    },
    zip:{
        type:Number,
        require:true,
        maxLength:7
    }
})
module.exports = addressSchema
const mongoose = require("mongoose")
const sizeSchema = new mongoose.Schema({
    length:{
        type:Number,
    },
    width:{
        type:Number,
    },
    height:{
        type:Number,
    },
    weight:{
        type:Number,
    }
},{})
module.exports = sizeSchema
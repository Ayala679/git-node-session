const mongoose = require("mongoose")
const sizeSchema = require("./InnerModels/sizeModel")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    details:{
        type:String
    },
    category:{
        type:String,
        enum:["גן ומרפסת","שמשיות ופתרונות הצללה","אדניות ועציצים","מטבח חוץ ואביזרים","אביזרים לגינה","תאורת גינה וחוץ"],
        require:true
    },
    size:{
        type:sizeSchema
    },
    color:{
        type:[String]
    },
    picture:{
        type:[String],
        require:true
    },
    price:{
        type:Number,
        require:true
    }
},{})

module.exports = mongoose.model("Product",productSchema)
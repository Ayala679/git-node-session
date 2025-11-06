require("dotenv").config()
const path = require("path")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5311
const cors = require("cors")
const corsOptions = require("./config/corsOptions")

const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use("/images",express.static(path.join(__dirname, '/images')))
app.use("/api/user",require("./routes/userRoute"))
app.use("/api/product",require("./routes/productRoute"))
app.use("/api/basket",require("./routes/basketRoute"))
mongoose.connection.once("open",()=>{
    console.log(`connected to MongoDB`)
    app.listen(PORT,()=>{
        console.log(`server running on PORT ${PORT}`)
    })
})
mongoose.connection.on("error",err=>{
    console.log(err)
})
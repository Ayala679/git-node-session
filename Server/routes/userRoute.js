const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const User = require("../models/userModel")
const {addUser,login} = require("../controllers/userController")
router.post("/register",addUser)
router.post("/login",login)
module.exports = router
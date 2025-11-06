const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")
const { getBasketById, addToBasket, updateProductInBasket, deleteProductFromBasket } = require("../controllers/basketController")
const router =  express.Router()
router.get("/:id",verifyJWT,getBasketById)
router.post("/:custId/:prodId",verifyJWT,addToBasket)
router.put("/:custId/:prodId/:amount",verifyJWT,updateProductInBasket)
router.delete("/:custId/:prodId",verifyJWT,deleteProductFromBasket)
module.exports = router
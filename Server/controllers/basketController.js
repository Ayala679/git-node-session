const Basket = require("../models/basketModel")
const User = require("../models/userModel")
const Product = require("../models/pruductModel")
//getBasketById
const getBasketById = async(req,res)=>{
    const {id} = req.params
    const basket = await Basket.find({customer:id}).populate('product')
    if(!basket || !basket.length)
        return res.status(400).json({message:'no products found'})
    res.json(basket)
}

//addToBasket
const addToBasket = async(req,res)=>{
    const{custId,prodId} = req.params
    const user = await User.findById(custId).lean()
    const product = await Product.findById(prodId).lean()
    if(!user || !product)
        return res.status(401).json({message:`Unauthorizes`})
    const basket = await Basket.findOne({customer:custId,product:prodId}).exec()
    if(basket)
        return res.status(409).json({message:`product: ${product.name} is already exists on your basket`})
    const newBasket = await Basket.create({customer:custId,product:prodId})
    res.status(201).json({message:`product: ${product.name} added to your basket`})     
}

//updateProductInBasket
const updateProductInBasket = async(req,res)=>{
 const{custId,prodId,amount} = req.params
    const user = await User.findById(custId).lean()
    const product = await Product.findById(prodId).lean()
    if(!user || !product)
        return res.status(401).json({message:`Unauthorizes`})
    const basket = await Basket.findOne({customer:custId,product:prodId}).exec()
    if(!basket)
        return res.status(400).json({message:'product not found on your basket'})
    basket.amount+=Number(amount)
    const updateBasket = await basket.save()
    res.status(201).json({message: `product: ${product.name} updated on basket`})
}

//deleteProductFromBasket
const deleteProductFromBasket = async(req,res)=>{
    const {custId,prodId} = req.params
    const user = await User.findById(custId).lean()
    const product = await Product.findById(prodId).lean()
    if(!user || !product)
        return res.status(401).json({message:`Unauthorizes`})
    const basket = await Basket.findOne({customer:custId,product:prodId}).exec()
    if(!basket)
        return res.status(400).json({message:'product not found on your basket'})
    const result = await basket.deleteOne()
    res.status(201).json({message:`product: ${basket.name} deleted from your basket`})
}


module.exports = {getBasketById,addToBasket,updateProductInBasket,deleteProductFromBasket}
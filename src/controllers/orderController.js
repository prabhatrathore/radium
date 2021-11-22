const mongoose = require('mongoose')
const orderController = require('./userController')
const orderModel = require('../models/orderModel')
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')

const getOrderData = async function (req, res) {
    var data = req.body    
    let savedData = await userModel.findById(data.userId)
console.log(savedData)

if (!savedData) {
    res.send({ message: "User doesn't exist. Please check userId" });
  }

  let product = await productModel.findById(data.productId);
  if (!product) {
    res.send({ message: "Product doesn't exist. Please check productId" });
  }
  module.exports.getOrderData = getOrderData
}
    
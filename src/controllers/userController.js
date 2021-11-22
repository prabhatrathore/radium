
const userModel = require("../models/userModel")
const orderModel = require("../models/orderModel")
const orderController = require("./orderController")




const getUserData2 = async function (req, res) {
    var data2 = req.body
   
    let savedData = await userModel.create(data2)
    res.send(savedData)
}
module.exports.getUserData2 = getUserData2

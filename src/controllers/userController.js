const userModel = require("../models/userModel")
const orderModel = require("../models/orderModel")
const orderController = require("./orderController")
//const jwt = require('jsonwebtoken')

const createUser = async function (req, res) {
    let userDetails = req.body
    let appType = req.headers['isfreeapp']
    let userType
    if (appType === 'false') {
        userType = false
    } else {
        userType = true
    }

    userDetails.freeAppUser = userType//this attribute was set in req in the appMiddleware
    let userCreated = await userModel.create(userDetails)
    res.send({ data: userCreated })
}

module.exports.createUser = createUser

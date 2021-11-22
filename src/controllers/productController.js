const productModel = require("../models/productModel")



const getProductData = async function (req, res) {
    var productData = req.body
    let savedData = await productModel.create(productData)
    res.send({ data: savedData })
}

module.exports.getProductData = getProductData



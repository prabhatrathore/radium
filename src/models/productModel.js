const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: String,
    productId:Number,
    catogory: String,
    price:Number,
}, { timestamps: true }

)
module.exports = mongoose.model('myProduct', productSchema)



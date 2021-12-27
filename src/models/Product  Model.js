const mongoose = require('mongoose')



const ProductSchema = new mongoose.Schema({


    title: {type:String, required:true, unique:true,trim:true},
    description: {type:String, required:true,trim:true},
    price: {type:Number, required:true,trim:true },
    currencyId: {type:String, required:true,trim:true},
    currencyFormat: {type:String, required:true,trim:true },
    isFreeShipping: {type:Boolean, default: false,trim:true},
    productImage: {type:String, required:true },  
    style: {type:String,trim:true},
    availableSizes: { type:[String],required:true},
    installments: {type:Number,trim:true},
    deletedAt: {type:Date, default:null}, 
    isDeleted: {type:Boolean, default: false},
    createdAt:{type: Date,default: Date.now},
    updatedAt:{type:Date, default:Date.now}
  },{ timestamps: true });

  module.exports = mongoose.model('ProductDB', ProductSchema)
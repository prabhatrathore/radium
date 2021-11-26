const mongoose = require('mongoose')

const coinSchema = new mongoose.Schema({

    name: {type:String, unique:false},
    symbol:{type:String, unique:false},
    marketCapUsd:{type:String }, 
    priceUsd:{type:String}, 
   
    
},{ timestamps: true }
)
module.exports = mongoose.model('coin', coinSchema)

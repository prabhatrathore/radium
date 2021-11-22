const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: String,
    userId: Number,
    balance:{ type:Number, default:100},
            address: String,
    age: Number,
    gender: { type: String, enum: ['female', 'male', 'other'] },
    address: String,    
    freeAppUser: { type: Boolean, default: false },
}, { timestamps: true }

)
module.exports = mongoose.model('myUser', userSchema)

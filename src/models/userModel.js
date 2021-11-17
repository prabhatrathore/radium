const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true  },
    ISBN: {
        type: String,
        required: true,
        unique: false   },
    authorName: String,
    tags: [String], //array of string
    year: Number,
    isPublished: {
        type: Boolean, //Boolean
        default: false    },
    prices: {
        indianPrice: String,
        europeanPrice: String,    },

    totalPages: Number,
    year: {
        type: Number,
        default: 2021   },
        stockAvailable:{ type: Boolean,default: false }
    });

    { timestamps: true }  



module.exports = mongoose.model('Book', bookSchema)

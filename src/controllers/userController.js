const BookModel = require("../models/userModel.js")
const mongoose = require("mongoose")
//const bookModel = require("../models/bookModel.js")
//q1 create collection of 11+books.
const getBookData = async function (req, res) {
    var data = req.body
    let savedData = await BookModel.create(data)
    res.send({ msg: savedData })}

    // 2:: return all the bookname and author name only.
    const newBookData = async function (req, res) {
        let allBook = await BookModel.find().select({ bookName: 1, authorName: 1, _id: 0 })
        res.send({ msg: allBook })
    }

    const getBookInYear = async function (req, res) {
        let allBook = await BookModel.find({ year: req.body.year })
        res.send({ msg: allBook })
    }
    const getParticularBooks = async function (req, res) {
        let allBook = await BookModel.find(req.body)
        res.send({ msg: allBook })
    }
    const getXINRBook = async function (req, res) {
        let allBook = await BookModel.find({ 'price:indianPrice': { $in: ["100", "200", "500"] } })
        res.send({ msg: allBook })
    }
    const getRandomBooks = async function (req, res) {
        const  allBook = await BookModel.find({ $or: [{ stockAvailable: true }, { totalPages: { $gt: 500 } }] })
        res.send({ msg: allBook })
    }


module.exports.newBookData = newBookData
module.exports.getBookData = getBookData
module.exports.getBookInYear = getBookInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBook = getXINRBook
module.exports.getRandomBooks = getRandomBooks
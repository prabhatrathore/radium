const BookModel = require('../models/bookModel')
const authorController = require('../controllers/authorController')
const authorModel = require('../models/authorModel')
const bookModel = require('../models/bookModel')


/* Write a create book api that takes author from the request body. 
You have to first check if this is a valid authorId. A valid authorId
 is which is present in your authors collection*/
const getBookData = async function (req, res) {
    var data = req.body
    var authorId = req.body.author
    let savedData = await authorModel.findById(authorId)
    if (savedData) {
        let bookCreated = await bookModel.create(data)
        res.send({ data: bookCreated })
    } else {
        res.send('the author Id is not valid')
    }
}

const getBooks = async function (req, res) {
    let allBook = await bookModel.find().populate('author')
    res.send(allBook)
}


module.exports.getBookData = getBookData
module.exports.getBooks = getBooks


const authorModel = require("../models/authorModel.js")
const bookModel = require("../models/bookModel.js")
const bookController = require("../controllers/bookController")

/*Write a create author api that creates an author from the details in request body
*/
const getAuthorData = async function (req, res) {
    var data = req.body
    let savedData = await authorModel.create(data)
    res.send({ data: savedData })
}

module.exports.getAuthorData = getAuthorData



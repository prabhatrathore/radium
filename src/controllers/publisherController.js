const publisherModel = require("../models/publisherModel")

const publisherController = require("../controllers/publisherController")

/*Write a create author api that creates an author from the details in request body
*/
const getPublisherData = async function (req, res) {
    var data = req.body
    let savedData = await publisherModel.create(data)
    res.send({ data: savedData })
}

module.exports.getPublisherData = getPublisherData



const express = require('express');
const router = express.Router();
//const bookModel = require("../models/bookModel")
//const authorModel = require("../models/authorModel")

const bookController = require("../controllers/bookController")

const authorController = require("../controllers/authorController")
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
const publisherController =require("../controllers/publisherController")

router.post('/createBook', bookController.getBookData);
router.post('/createAuthor', authorController.getAuthorData);

router.get('/getBooks', bookController.getBooks);
router.post('/getPublisher', publisherController.getPublisherData);
module.exports = router;
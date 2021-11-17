const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")

//const UserController= require("../controllers/userController")
const BookController= require("../controllers/userController")

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

//router.post('/createUser',  UserController.createBook  );
//router.get('/getAllBook',  UserController.getUserData  );

//router.post('/createBook',  BookController.createBook  );
router.post('/createBook',  BookController.getBookData  );
router.get('/getBooks',  BookController.newBookData  );

router.post('/getBookInYear',  BookController.getBookInYear  );
router.post('/getXINRBook',  BookController.getParticularBooks  );

router.get('/getParticularBooks',  BookController.getXINRBook  );
router.get('/getRandomBook',  BookController.getRandomBooks  );
 
module.exports = router;
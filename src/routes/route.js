const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
const authenticate = require("../middlewaree/middleware")
    
router.put('/updateUser/:userId', userController.updateUser);//ok

router.get('/users/:userId', userController.getDetails)
//For JWT session
router.post('/login', userController.login)//ok
router.post('/createUser',  userController.createUser);//ok
module.exports = router;
const express = require('express');

const router = express.Router();

const USERController=require("../controllers/Usercontroller")
const Middleware=require("../middleware/Authentication")



router.post('/register',USERController.createUser)
router.post('/login',USERController.loginUser)
router.get('/user/:userId/profile',USERController.getUserDetails)
router.put('/user/:userId/profile',/*Middleware.Auth*/USERController.UpdateUser)

module.exports = router;
const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController")
const userController = require("../controllers/userController")
const appMiddleware = require("../middlewaree/middleware")
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
const orderController = require("../controllers/orderController")
    
router.post('/createProduct', productController.getProductData);//ok
//router.post('/createUser', userController.getUserData);
router.post('/orders', appMiddleware.validateAppType, orderController.createOrder);//ok
router.post('/createUser', appMiddleware.validateAppType, userController.createUser);//ok
module.exports = router;
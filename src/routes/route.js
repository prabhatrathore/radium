const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController")
const userController = require("../controllers/userController")
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
const orderController = require("../controllers/orderController")

const midlb = function ( req, res, next){
    let array2 =req.headers
    //console.log(array2)
if(array2.freeappuser){
next()
}else{
res.send("terminate")
}
    }

router.post('/createProduct', productController.getProductData);
//router.post('/createUser', userController.getUserData);

router.post('/getOrder', orderController.getOrderData);
//router.get('/getBooks', userController.getBooks);
router.post('/getUserData2', midlb, userController.getUserData2);
module.exports = router;
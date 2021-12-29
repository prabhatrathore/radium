const express = require('express');

const router = express.Router();

const USERController=require("../controllers/Usercontroller")
const Middleware=require("../middleware/Authentication")
const ProductController=require("../controllers/Product Controller")
const CartController=require("../controllers/CartController")


//User API
router.post('/register',USERController.createUser)
router.post('/login',USERController.loginUser)
router.get('/user/:userId/profile',Middleware.Auth,USERController.getUserDetails)
router.put('/user/:userId/profile',Middleware.Auth,USERController.UpdateUser)

//Product API
router.post('/products',ProductController.createProduct)
router.get('/products',ProductController.getProduct)
router.get('/products/:productId',ProductController.getproductId)
router.put('/products/:productId',ProductController.updateProduct)
router.delete('/products/:productId',ProductController.deleteProduct)


//Cart API

router.post('/users/:userId/cart',Middleware.Auth,CartController.createCart)
router.put('/users/:userId/cart',Middleware.Auth,CartController.updateCart)
router.get('/users/:userId/cart',Middleware.Auth,CartController.getCart)
router.delete('/users/:userId/cart',Middleware.Auth,CartController.deleteCart)

// Order API

module.exports = router;
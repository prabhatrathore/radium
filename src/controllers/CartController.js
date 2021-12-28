const CartModel = require("../models/Cart Model")
const ProductModel = require("../models/Product  Model")
const UserModel = require("../models/User Model")
const mongoose = require("mongoose")
const validate = require("../Util/Validation")



const createCart = async (req, res) => {
    let requestbody = req.body
    const cartId = req.body.cartId;
    const UserId = req.params.userId
    TokenDetail = req.user

    if (!(validate.isValidObjectId(UserId))) {
        return res.status(400).send({ status: false, message: 'Please provide valid userId' })
    }

    if (!TokenDetail == UserId) {
        res.status(401).send({ status: false, message: "userId in url param and in token is not same" })
    }
    if (!validate.isValidRequestBody(requestbody)) {
        res.status(400).send({ status: false, message: 'Please provide Cart(Items) details' })
        return
    }

    if (!validate.isValid(requestbody.items[0].productId)) {
        return res.status(400).send({ status: false, message: ' Please provide productId' })
    }


    if (!validate.isValid(requestbody.items[0].quantity)) {
        return res.status(400).send({ status: false, message: ' Please provide quantity' })
    }

    let findCart = await CartModel.findOne({ userId: UserId });
    if (findCart) {
        const { items } = requestbody;
        for (let i = 0; i < items.length; i++) {
            const product = await ProductModel.findOne({ _id: (items[i].productId) })
            console.log(product)

            let ProductIndex = findCart.items.findIndex(p => p.productId == items[i].productId)
            if (ProductIndex > -1) {
                findCart.items[ProductIndex].quantity = findCart.items[ProductIndex].quantity + items[i].quantity;
                await findCart.save();
                findCart.totalPrice = findCart.totalPrice + ((items[i].quantity) * (product.price))
                await findCart.save();
                return res.status(200).send({ status: true, data: findCart })

            } else {

                TotalPrice = findCart.totalPrice + ((items[i].quantity) * (product.price))
                TotalItems = findCart.totalItems + 1;
                const cartdetail = await CartModel.findOneAndUpdate({ userId: findCart.userId }, { $addToSet: { items: { $each: items } }, totalPrice: TotalPrice, totalItems: TotalItems }, { new: true })

                return res.status(200).send({ status: true, data: cartdetail })
            }

        }

    }
    if (!findCart) {
        const { items } = requestbody;
        for (let i = 0; i < items.length; i++) {
            const product = await ProductModel.findOne({ _id: (items[i].productId) })
            let price = product.price;
            let total = (items[i].quantity) * price;
            let TotalItems = 1
            const newCart = {
                userId: UserId,
                items: [{ productId: items[i].productId, quantity: items[i].quantity }],
                totalPrice: total,
                totalItems: TotalItems
            }
            const data = await CartModel.create(newCart);
            return res.status(201).send({ status: true, data: data })
        }
    }
}


module.exports = { createCart }
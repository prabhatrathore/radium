const OrderModel = require("../models/Order Model")
const CartModel = require("../models/Cart Model")
const UserModel = require("../models/User Model")
const mongoose = require("mongoose")
const validate = require("../Util/Validation")
const { findOneAndUpdate } = require("../models/Cart Model")

const createOrder = async (req, res) => {
    try {
        const userId = req.params.userId
        const requestBody = req.body;
        TokenDetail = req.user

        if (!(validate.isValidObjectId(userId))) {
            return res.status(400).send({ status: false, message: 'Please provide valid userId' })
        }

        const UserFound = await UserModel.findOne({ _id: userId })
        if (!UserFound) {
            return res.status(404).send({ status: false, message: `User Details not found with given UserId` })
        }

        if (!TokenDetail == userId) {
            res.status(401).send({ status: false, message: "userId in url param and in token is not same" })
        }

        if (!validate.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid params received in request body' })
        }

        const { cartId, cancellable, status } = requestBody

        const cart = await CartModel.findOne({ _id: cartId, userId: userId });

        const TotalPrice = cart.totalPrice;
        const TotalItems = cart.totalItems;
        let Arr = cart.items.toObject()
        status = status.toLowerCase()
        if (status) {
            if (!validate.isValidStatus(status)) {
                return res.status(400).send({ status: false, message: `Status should be among confirmed, pending and cancelled` })
            }
        }


        if (requestBody.status == "confirmed") {
            let Cart = cart.items
            cart.totalPrice = 0;
            cart.totalItems = 0;
            Cart.splice(0)
            await cart.save()
        }

        if (!cart) {
            return res.status(404).send({ status: false, message: `this User is not the owner of this cart` })
        }

        if (cancellable) {
            if (!(typeof (cancellable) == 'boolean')) {
                return res.status(404).send({ status: false, message: `Cancellable should be a boolean value` })
            }
        }
        if (!(Arr.length)) {
            return res.status(202).send({ status: true, message: `order has been accepted, please add more product in the cart` })
        }

        let totalQuantity = 0;
        for (let i = 0; i < Arr.length; i++) {
            totalQuantity = totalQuantity + Arr[i].quantity
        }

        const addToOrder = {
            _id: cart._id,
            userId: userId,
            items: Arr,
            totalPrice: TotalPrice,
            totalItems: TotalItems,
            totalQuantity: totalQuantity,
            cancellable,
            status
        }

        let order = await OrderModel.create(addToOrder)
        return res.status(201).send({ status: true, message: "success", data: order })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const updateOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        requestbody = req.body;
        TokenDetail = req.user

        if (!(validate.isValidObjectId(userId))) {
            return res.status(400).send({ status: false, message: 'Please provide valid userId' })
        }

        const UserFound = await UserModel.findOne({ _id: userId })
        if (!UserFound) {
            return res.status(404).send({ status: false, message: `User Details not found with given UserId` })
        }


        if (!TokenDetail == userId) {
            res.status(401).send({ status: false, message: "userId in url param and in token is not same" })
        }

        if (!validate.isValidRequestBody(requestbody)) {
            return res.status(400).send({ status: false, message: 'Invalid params received in request body' })
        }

        let { orderId, status } = requestbody
        status = status.toLowerCase()
        if (!validate.isValidStatus(status)) {
            return res.status(400).send({ status: false, message: `Status should be among confirmed, pending and cancelled` })
        }

        const OrderFound = await OrderModel.findOne({ _id: orderId })
        OrderFound.toObject();
        if (!OrderFound) {
            return res.status(400).send({ status: false, message: `Order not found with given OrderId` })
        }

        if (!OrderFound.userId == userId) {
            return res.status(400).send({ status: false, message: `Order does not belong to given userId` })
        }
        console.log(OrderFound.status)
        console.log(typeof OrderFound.status)
        if (["completed", "cancelled"].includes(OrderFound.status)) {
            return res.status(400).send({ status: false, message: `Can not update order which have status cancelled or completed` })
        }

        OrderFound.status = status.toLowerCase();
        await OrderFound.save()
        return res.status(200).send({ status: true, message: `Order Updated Successfully`, data: OrderFound })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
module.exports = { createOrder, updateOrder }
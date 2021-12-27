const ProductModel = require("../models/Product  Model")
const mongoose = require("mongoose")
const validate = require("../Util/Validation")
const Uploading = require("../Util/S3Uploading")




const createProduct = async function (req, res) {

    let requestbody = req.body;
    let files = req.files;

    if (!validate.isValidRequestBody(requestbody)) {
        return res.status(400).send({ status: false, message: 'No request parameters. Please provide Product details' })
    }

    if (!(files && files.length > 0)) {

        res.status(400).send({ status: false, message: "Please provide productImage" })
    }

    let { title, description, price, currencyId, currencyFormat, isFreeShipping, style, availableSizes, installments, isDeleted } = requestbody;
    // Validation Starts
    if (!validate.isValid(title)) {
        return res.status(400).send({ status: false, message: `title is required` })
    };
    const TitleUsed = await ProductModel.findOne({ title });
    if (TitleUsed) {
        res.status(400).send({ status: false, message: `${title} title  is already registered` })
        return
    };
    title = title.trim()
    if (!validate.isValid(description)) {
        return res.status(400).send({ status: false, message: `description is required` })
    };
    description = description.trim()
    if (!validate.isValid(price)) {
        return res.status(400).send({ status: false, message: `price is required` })
    };

    if (!(!isNaN(Number(price)))) {
        return res.status(400).send({ status: false, message: `Price should be a valid number/decimal` })
    }
    price = parseFloat(price).toFixed(2)
    if (!validate.isValid(currencyId)) {
        return res.status(400).send({ status: false, message: `currencyId is required` })
    };
    currencyId = currencyId.toUpperCase().trim()
    if (!(currencyId == "INR")) {
        return res.status(400).send({ status: false, message: `currencyFormat should be INR` })
    }
    if (!validate.isValid(currencyFormat)) {
        return res.status(400).send({ status: false, message: `currencyFormat is required` })
    };
    currencyFormat = currencyFormat.trim()
    if (!(currencyFormat == "₹")) {
        return res.status(400).send({ status: false, message: `currencyFormat should be ₹` })
    }
    if (!validate.isValid(availableSizes)) {
        return res.status(400).send({ status: false, message: `Please give atleast one size ` })
    };

    const Check = availableSizes.split(",")
    if (!validate.ValidSize(Check)) {
        return res.status(400).send({ status: false, message: `${[Check[i]]} is not a valid size` })
    }
    availableSizes = Check;

    // Validation Ends

    var uploadedFileURL = await Uploading.uploadFile(files[0]);
    const ProductData = { title, description, price, currencyId, currencyFormat, isFreeShipping, productImage: uploadedFileURL, style, availableSizes, installments, isDeleted }
    const Product = await ProductModel.create(ProductData);
    return res.status(201).send({ status: true, message: ` Product Details saved successfully`, data: Product });
}

const getProduct = async function (req, res) {
    try {
        let filterQuery = { isDeleted: false }
        let querybody = req.query;

        if (!validate.isValidRequestBody(querybody)) {
            let NDeleted = await ProductModel.find(filterQuery).sort({ price: -1 })
            res.status(200).send({ status: true, message: 'Not Deleted product List', data: NDeleted })
            return
        };
        const { size, name, priceGreaterThan, priceLessThan } = querybody


        if (validate.isValid(size)) {
            var sizeOf = size.toUpperCase().trim()
            filterQuery['availableSizes'] = sizeOf.trim()
        };
        if (validate.isValid(name)) {
            filterQuery['title'] = { $regex: name.trim() }
        };
        if (priceGreaterThan) {
            filterQuery.price = { $gt: priceGreaterThan }
        };
        if (priceLessThan) {
            filterQuery.price = { $lt: priceLessThan }
        };
        if (priceLessThan && priceGreaterThan) {
            filterQuery.price = { $lt: priceLessThan, $gt: priceGreaterThan }
        };
        let data = await ProductModel.find(filterQuery).sort({ price: -1 })

        if (Array.isArray(data) && data.length === 0) {
            return res.status(400).send({ status: false, msg: "no product found " })
        }
        return res.status(200).send({ status: true, msg: "products list1", data: data })


    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
};

const getproductId = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!validate.isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: `${productId} is not a valid product id` })
        }

        const Product = await ProductModel.findById({ _id: productId, isDeleted: false });

        if (!Product) {
            return res.status(404).send({ status: false, message: `Product does not exit` })
        }

        return res.status(200).send({ status: true, message: 'Success', data: Product })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        productId = req.params.productId;
        const requestBody = req.body;
        const productImage = req.files

        if (!validate.isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: `${productId} is not a valid product id` })
        }

        const ProductFound = await ProductModel.findOne({ _id: productId })
        if (!ProductFound) {
            return res.status(404).send({ status: false, message: `Product Details not found with given productId` })
        }


        if (!validate.isValidRequestBody(requestBody)) {
            if (!(productImage)) {
                return res.status(400).send({ status: false, message: 'No paramateres passed. Product unmodified' })
            }
            elseif(!(productImage.length > 0))
            {
                return res.status(400).send({ status: false, message: "ProductImage is required" })
            }
        }


        let { title, description, price, currencyId, currencyFormat, isFreeShipping, availableSizes, style, installments } = requestBody

        if (Object.prototype.hasOwnProperty.call(requestBody, 'title')) {
            if (!validate.isValid(title)) {
                return res.status(400).send({ status: false, message: `title is required` })
            };
            const TitleUsed = await ProductModel.findOne({ title });
            if (TitleUsed) {
                return res.status(400).send({ status: false, message: `${title} title  is already registered` })
            }
        }
        if (Object.prototype.hasOwnProperty.call(requestBody, 'description')) {
            if (!validate.isValid(description)) {
                return res.status(400).send({ status: false, message: `description is required` })
            };
        }

        if (Object.prototype.hasOwnProperty.call(requestBody, 'price')) {
            price = parseFloat(price).toFixed(1)
            if (!(!isNaN(Number(price)))) {
                return res.status(400).send({ status: false, message: `Price should be a valid number/decimal` })
            }
        }
        if (Object.prototype.hasOwnProperty.call(requestBody, 'currencyId')) {
            if (!(currencyId == "INR")) {
                return res.status(400).send({ status: false, message: `currencyFormat should be INR` })
            }
        }
        if (Object.prototype.hasOwnProperty.call(requestBody, 'currencyFormat')) {
            if (!validate.isValid(currencyFormat)) {
                return res.status(400).send({ status: false, message: `currencyFormat is required` })
            };

            if (!(currencyFormat == "₹")) {
                return res.status(400).send({ status: false, message: `currencyFormat should be ₹` })
            }

            if (!validate.isValid(availableSizes)) {
                return res.status(400).send({ status: false, message: `Please give atleast one size ` })
            };
        }
        if (Object.prototype.hasOwnProperty.call(requestBody, 'availableSizes')) {
            const Check = availableSizes.split(",")

            if (!validate.ValidSize(Check)) {
                return res.status(400).send({ status: false, message: `${[Check[i]]} is not a valid size` })
            }
            availableSizes = Check;
        }
        if (productImage && productImage.length > 0) {
            var uploadedFileURL = await Uploading.uploadFile(productImage[0]);
            console.log(uploadedFileURL)
            requestBody.productImage = uploadedFileURL
        }

        //Validation Ends


        const UpdateData = { title, description, price, currencyId, currencyFormat, isFreeShipping, availableSizes, productImage: uploadedFileURL, style, installments }
        UpdateData.UpdatedAt = new Date()
        const upatedUser = await ProductModel.findOneAndUpdate({ _id: productId }, UpdateData, { new: true })
        res.status(200).send({ status: true, message: 'User updated successfully', data: upatedUser });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        if (!validate.isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: `${productId} is not a valid product id` })
        }

        const ProductFound = await ProductModel.findOne({ _id: productId })
        if (!ProductFound) {
            return res.status(404).send({ status: false, message: `Product Details not found with given productId` })
        }

        if (ProductFound.isDeleted == true) {
            return res.status(404).send({ status: false, message: "This Product no longer exists" });
        }
        await ProductModel.findOneAndUpdate({ _id: productId }, { $set: { isDeleted: true, deletedAt: new Date() } })
        res.status(200).send({ status: true, message: `Product deleted successfully` })
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}


module.exports = { createProduct, getProduct, getproductId, updateProduct, deleteProduct }

//userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const axios = require('axios');
const userModel = require('../models/userModel');

const coinap = async function (req, res) {
    try {
        // let header = req.headers['Authorization']
        let options = {
            method: "get",
            url: "http://api.coincap.io/v2/assets"//?api=f7c53f2b-5015-432b-abfb-ca5104cffcec`
        }
 let coinresponse = await axios(options);
 let fullData = coinresponse.data.data.sort(function (a, b) { return b.changePercent24Hr - a.changePercent24Hr })
        //console.log(fullData);
 for (let i = 0; i < fullData.length; i++) {
 let data2 = (({ name, symbol, marketCapUsd, priceUsd }) => ({ name, symbol, marketCapUsd, priceUsd }))(fullData[i])
          await userModel.findOneAndUpdate({ "name": data2.name }, data2, { upsert: true })
            //console.log(data2)
        }
        const data1 = await userModel.find()
        //console.log(data1)
        res.status(200).send({ detail: data1 })
    }

    catch (err) {
        // console.log(err.message);
        res.status(500).send({ msg: "Error occured" });
    }
};





module.exports.coinap = coinap

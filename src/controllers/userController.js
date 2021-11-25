const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const axios = require('axios')

const getwhether = async function (req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
        let cityarray = [];
        //let city2 = { city: cities[i] }
     
        for (i = 0; i < cities.length; i++){  
            let city2 = { city: cities[i] }        
        let res = await axios.get( `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=e7bff9b3a24bb5d619f3fc6fc7de5f07`
  )           
        let res1 = res.data.main.temp;
        console.log(res1)
        city2.temp = res1
        cityarray.push(city2);
       
    }
let sorted =cityarray.sort( function(a,b){return a.temp-b.temp})
console.log(sorted)
res.status(200).send({status:true,data:sorted})
}
    catch (err){
        console.log(err)
        res.status(500).send({ status:false,msg: "error",  });

    }






}

const londonweather = async function (req, res) {
    try {
        let array = {
            method: "get",
            url: "http://api.openweathermap.org/data/2.5/weather?q=London&appid=e7bff9b3a24bb5d619f3fc6fc7de5f07",
        }

        let array2 = await axios(array);
        let array4 = array2.data.name;
        console.log(array4);
        let array3 = array2.data.main.temp;
        console.log(array3);
        //arr.push(array3);
        res.status(200).send({ data: "successfully data fetch", temp: array3 });
    }
    catch (err) {
        res.status(500).send({ msg: "not valid" })
    }
}
const delhiweather = async function (req, res) {
    let delhi = {
        method: "get",
        url: "http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=e7bff9b3a24bb5d619f3fc6fc7de5f07"

    }
    let delhi1 = await axios(delhi);
    let delhi4 = delhi1.data.name;
    console.log(delhi4);
    let delhi3 = delhi1.data.main.temp;
    console.log(delhi3);
    //arr.push(delhi3);
    res.status(200).send({ data: "successfully data fetch", temp: delhi3 });
}
const chennaiweather = async function (req, res) {
    let chennai = {
        method: "get",
        url: "http://api.openweathermap.org/data/2.5/weather?q=chennai&appid=e7bff9b3a24bb5d619f3fc6fc7de5f07"

    }
    let chennai1 = await axios(chennai);
    let chennai4 = chennai1.data.name;
    console.log(chennai4);
    let chennai3 = chennai1.data.main.temp;
    console.log(chennai3);
    //arr.push(chennai3);
    res.status(200).send({ data: "successfully data fetch", temp: chennai3 });
}
const moscowweather = async function (req, res) {
    let moscow = {
        method: "get",
        url: "http://api.openweathermap.org/data/2.5/weather?q=moscow&appid=e7bff9b3a24bb5d619f3fc6fc7de5f07"

    }
    let moscow1 = await axios(moscow);
    let moscow4 = moscow1.data.name;
    //console.log(moscow4);
    let moscow3 = moscow1.data.main.temp;
    //console.log(moscow3);
    //arr.push(moscow3);
    res.status(200).send({ data: "successfully data fetch", temp: moscow3 });
}
module.exports.getwhether = getwhether
module.exports.londonweather = londonweather;
module.exports.delhiweather = delhiweather;
module.exports.chennaiweather = chennaiweather;
module.exports.moscowweather = moscowweather;

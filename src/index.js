const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
const midGlb = function ( req, res, next){
    console.log("hi this is functionup bootcamp");
    let a =req.ip;
    let b =req.originalUrl;
    console.log(new Date())
  
    next()
    var currentDate = new Date()
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
      var hour = currentDate.getHours() + ":"  
     var min = currentDate.getMinutes() + ":" 
     var sec = currentDate.getSeconds();
    
    let today = day+'/'+ month +'/'  +year +',  '+hour+min+sec
    console.log(`${today} ${a} ${b}`)
    }    
    app.use(midGlb)*/
    

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/Prabhat-Rathore?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);



app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});
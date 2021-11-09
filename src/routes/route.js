const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
//q1
router.get('/movies', function (req, res) {
    let movies= ['ddd','gggg','hhh','kkkk','llll','iiiiiu']
res.send(movies)
});
//q2
router.get('/movies1/:index', function (req, res){   
    let value=req.params.index
    const arr=['7ddd','8gggg','9hhh','0kkkk','11llll','12iiiiiu']
        res.send(arr[value])
});   
//q3
router.get('/movies2/:index', function (req, res){   
    let value= req.params.index
    const arr=['dd1d','2gggg','3hhh','4kkkk','5llll','6iiiiiu']
   // value < arr.length-1 ? res.send(arr[value]) : res.send(arr['Please send valid index']);
       // res.send(arr[value])
       if (value <arr.length){
           res.send(arr[value])
       }else{
           res.send("dont exit")
       }
});   // homework question 
//q 3.1
router.get('/films', function (req, res){   
    //let value=req.params.index
    const arr2= [ '{  id: 1,  name: The-Shining}',
        ' { id: 2, name: Incendies  }', 
         '{ id: 3,   name: Rang-de-Basanti}', 
         '{id: 4,  name: Finding-Demo  }']
       res.send(arr2)  
}); 
//q4
router.get('/filmsid/:index', function (req, res){   
    let value=req.params.index
    const arr3= [ '{  id: 1,  name: The-Shining}',
        ' { id: 2, name: Incendies  }', 
         '{ id: 3,   name: Rang-de-Basanti}', 
         '{id: 4,  name: Finding-Demo  }']
         if(value< arr3.length){
            res.send(arr3[value])
         }else{
            res.send("movie dont exit")
         }
       //res.send(arr3[value])  
    });

module.exports = router;









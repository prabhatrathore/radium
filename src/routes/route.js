const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.get('/londonweather', userController.londonweather)
router.get('/chennaiweather1', userController.chennaiweather)
router.get('/delhiweather', userController.delhiweather)//ok
router.get('/moscowweather1', userController.moscowweather)
router.get('/weather', userController.getwhether)
module.exports = router;
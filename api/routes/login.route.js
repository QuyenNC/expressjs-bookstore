var express = require('express');
var router = express.Router();

//Controller
var loginController = require("../controller/login.controller");

router.post('/login',loginController.postLogin);  

module.exports = router;
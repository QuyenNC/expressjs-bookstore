var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//Controller
var authController = require("../controller/auth.controller");

router.get('/login',authController.login);
router.post('/login',authController.postLogin);

module.exports = router;
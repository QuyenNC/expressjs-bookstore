var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//Controller
var cartController = require("../controller/cart.controller");

router.get('/',cartController.index); 
router.get('/add/:bookId',cartController.addToCart); 


module.exports = router;
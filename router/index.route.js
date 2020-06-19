var express = require('express');
var router = express.Router();
//count cookie
var cookies = require("../cookie/count.cookie");
var index = require('../controller/index.controller');
router.get('',cookies.countCookie,index.index);
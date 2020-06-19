var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//using shortid
const shortid = require('shortid');
//using bookController
var bookControler = require("../controller/book.controller");
//count cookie
var cookies = require("../cookie/count.cookie");

router.get('/',cookies.countCookie,bookControler.index);
router.get("/search",cookies.countCookie,bookControler.search);
//Route view book
router.get('/view/:id',cookies.countCookie,bookControler.view);
//Route delete book
router.get('/:id/delete',cookies.countCookie,bookControler.delete);
//Route update book
router.get('/update/:id',cookies.countCookie,bookControler.update);
router.post('/update/:id',cookies.countCookie,bookControler.postUpdate);
//Route create books
router.get('/create',cookies.countCookie,bookControler.create);

router.post('/create',cookies.countCookie,bookControler.postCreate);

module.exports = router;
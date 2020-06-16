var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//using shortid
const shortid = require('shortid');
//using bookController
var bookControler = require("../controller/book.controller");

router.get('/',bookControler.index);
router.get("/search",bookControler.search);
//Route view book
router.get('/view/:id',bookControler.view);
//Route delete book
router.get('/:id/delete',bookControler.delete);
//Route update book
router.get('/update/:id',bookControler.update);
router.post('/update/:id',bookControler.postUpdate);
//Route create books
router.get('/create',bookControler.create);

router.post('/create',bookControler.postCreate);

module.exports = router;
var express = require('express');
var router = express.Router();
//using cloudinary
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'codersx-ncq',
    api_key: '528629646581537',
    api_secret: 'iInJ94oLONf1hA3FbwKBUQegSwo'
});

//using multer
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })
//using lowdb
var db = require("../db");
//using transactionController
var profileControler = require("../controller/profile.controller");


router.get('/',profileControler.index);
router.post('/update', upload.single('avatar'),profileControler.postUpdate);

module.exports = router;
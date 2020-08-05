var express = require('express');
var router = express.Router();

//using multer
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })
//using bookController
var shopController = require('../controller/shop.controller');
var authRequest = require('../cookie/auth.middleware');
// router.get('/',shopController.index);

//Route view book
router.get('/view/:id',shopController.view);

// //Route update book
// router.get('/update/:id',bookControler.update);
// router.post('/update/:id',bookControler.postUpdate);
//Route create books
router.get('/create',authRequest.authRequest,shopController.create);

router.post('/create',authRequest.authRequest, upload.single('coverImg'),shopController.postCreate);

module.exports = router;
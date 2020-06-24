//using dotenv
require('dotenv').config();
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//Using lowdb
var db = require('../db')

module.exports.sendMailAuth = function(req, res, next){
    console.log('Bạn đã nhập sai lần mật khẩu');
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var user = db.get('users').find({id : req.signedCookies.userId}).value();
    console.log(user.wrongLoginCount)
    // if(user.wrongLoginCount > 4){
        // var transporter = nodemailer.createTransport(smtpTransport({
        //     service: 'gmail',
        //     host: 'smtp.gmail.com',
        //     auth: {
        //         user: process.env.SESSION_USER,
        //         pass: process.env.SESSION_PASS
        //     }
        // }));
        // var mailOptions = {
        //     from:  process.env.SESSION_USER,
        //     to: user.email,
        //     subject: 'Wrong password !!',
        //     text: 'Bạn đã nhập sai ' + user.wrongLoginCount + 'lần mật khẩu'
        // };
        // transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
            
        // });
       
    //    return;
    // }
    next();
}
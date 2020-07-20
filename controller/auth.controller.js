//using dotenv
require('dotenv').config();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//using lowdb
var db = require("../db");
//usin md5 
var md5 = require('md5');
//using bcrypt
var bcrypt = require('bcrypt');
var saltRounds = 10;
var wrongPassword = 0 ;
module.exports = {
    login :function(req, res){
        res.render('auth/login',{
            session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        });
    },
    postLogin:async function(req, res){
        var email = req.body.email;
        var password = req.body.password;
        var user = db.get('users').find({email : email}).value();
        if(!user){
            res.render('auth/login',{
                erros : [
                    "User không tồn tại"
                ],
                values : req.body
            });
            return;
        }
            if(wrongPassword > 4){
                var transporter = nodemailer.createTransport(smtpTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                        user: process.env.SESSION_USER,
                        pass: process.env.SESSION_PASS
                    }
                }));
                var mailOptions = {
                    from:  process.env.SESSION_USER,
                    to: user.email,
                    subject: 'Wrong password !!',
                    text: `Bạn đã nhập sai ${wrongPassword}lần liên tục`
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    
                });
                res.render('auth/login',{
                    erros : [
                        "Bạn nhập sai mất khẩu quá nhiều"
                    ],
                    values : req.body
                });
                return;
            }else{
                const match = await bcrypt.compare(password, user.password);
                    if(match !== true ) {
                        //login
                        res.render('auth/login',{
                            erros : [
                                "Mật khẩu không đúng"
                            ],
                            values : req.body
                        });
                        console.log(wrongPassword);
                        user.wrongLoginCount +=1;
                        wrongPassword +=1; // ở đây khi + lên mình chek rồi gửi mail luôn
                        return; 
                    }else{
                        wrongPassword =0;
                    }
            }
        res.cookie('userId',user.id,{
            signed : true
        });
        res.redirect('/');
    }
}
    
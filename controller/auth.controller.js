//using dotenv
require('dotenv').config();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//using mongoose
var Users = require("../models/users.models.js");
var Sessions = require("../models/sessions.models.js");

//usin md5 
var md5 = require('md5');
//using bcrypt
var bcrypt = require('bcrypt');
var saltRounds = 10;
var wrongPassword = 0 ;
module.exports = {
    login :async function(req, res, next){
        try{
            var sessions = await Sessions.findById(req.signedCookies.sessionId)
            res.render('auth/login',{
                session : sessions
            });
        } catch (error){
            res.send('500 Error Handing');
            next(error);
        }
        
    },
    postLogin:async function(req, res){
        var email = req.body.email;
        var password = req.body.password;
        var user = await Users.findOne({email : email}).exec();
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
                        user.wrongLoginCount +=1;
                        wrongPassword +=1; 
                        return; 
                    }else{
                        wrongPassword =0;
                    }
            }
        res.cookie('userId',user._id,{
            signed : true
        });
        res.redirect('/');
    }
}
    
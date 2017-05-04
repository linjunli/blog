var express = require('express');
var validator = require('validator');
var router = express.Router();
//登录
router.get('/signin', (req, res, next) => {
        res.render('signin');
    })
    .post('/signin', (req, res, next) => {
        // post提交的参数放在req.body中，表单input标签需要name属性(name="password")
        var email = validator.trim(req.body.email).toLowerCase();
        var password = validator.trim(req.body.password);
        res.send('post request!' + email + password);
    });
//注册
router.get('/signup', (req, res, next) => {
        res.render('signup');
    })
    .post('/signup', (req, res, next) => {
        var userInfo = req.body;
        var email = userInfo.email,
            nickname = userInfo.nickname,
            password = userInfo.password,
            repassword = userInfo.repassword;
        res.send('email:' + email + ' nickname:' + nickname + ' password:' + password + ' repassword:' + repassword);
    });
module.exports = router;
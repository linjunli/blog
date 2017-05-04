var express = require('express');
var eventproxy = require('eventproxy');
var authMiddleWare = require('../middlewares/auth.js');
var config = require('../configs/config');
var User = require('../proxy/user.js');
var util = require('../common/util.js');
var validator = require('validator');
var router = express.Router();

/**
 * 不跳转的页面
 */
var notJump = [
    'signup'
]

//登录
router.get('/signin', (req, res, next) => {
        req.session._loginReferer = req.headers.refer;
        res.render('signin');
    })
    .post('/signin', (req, res, next) => {
        // post提交的参数放在req.body中，表单input标签需要name属性(name="password")
        var nickname = validator.trim(req.body.email).toLowerCase();
        var password = validator.trim(req.body.password);
        var ep = new eventproxy();
        var getUser;

        ep.fail(next);
        if (nickname.indexOf('@') !== -1) {
            getUser = User.getUserByEmail;
        } else {
            getUser = User.getUserByName;
        }
        getUser(nickname, (err, user) => {
            if (err) {
                return next(err);
            }
            var passhash = user.password;
            util.bcompare(password, passhash, ep.done((bool) => {
                if (!bool) {
                    return;
                };
                authMiddleWare.genera_session(user, res);
                var refer = req.session._loginReferer || '/';
                for (var i = 0, len = notJump.length; i !== len; ++i) {
                    if (refer.indexOf(notJump[i] >= 0)) {
                        refer = '/';
                        break;
                    };
                }
                res.redirect(refer);
            }));
        });
        // res.send('post request!' + email + password);
    });
//注册
router.get('/signup', (req, res, next) => {
        res.render('signup');
    })
    .post('/signup', (req, res, next) => {
        var userInfo = req.body;
        var email = validator.trim(userInfo.email).toLowerCase(),
            nickname = validator.trim(userInfo.nickname).toLowerCase(),
            password = validator.trim(userInfo.password),
            repassword = validator.trim(userInfo.repassword);
        var ep = new eventproxy();
        ep.fail(next);
        ep.on('err', (msg) => {
            res.status(422);
            res.render('signup', {
                error: msg,
                nickname: nickname,
                email: email,
            });
        });
        //验证输入信息
        if ([nickname, password, repassword, email].some((item) => {
                return item == '';
            })) {
            ep.emit('err', '信息不完整！');
            return;
        };
        if (password !== repassword) {
            return ep.emit('err', "两次密码输入不一致！");
        };

        util.bhash(password, ep.done((passhash) => {
            User.newUser(nickname, email, passhash, (error) => {
                if (error) {
                    return next(error);
                };
                res.redirect('/signin');
            });
        }));
        // res.send('email:' + email + ' nickname:' + nickname + ' password:' + password + ' repassword:' + repassword);
    });
router.get('/signout', (req, res, next) => {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect('/');
})
module.exports = router;
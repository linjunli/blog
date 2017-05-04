var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var UserModel = mongoose.model('User');
var UserProxy = require('../proxy/user.js');
//var UserProxy = require('../proxy').User;
var config = require('../configs/config.js');
var eventproxy = require('eventproxy');

exports.genera_session = (user, res) => {
    var auth_token = user._id + '$$$$';
    var options = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, options);
};

/**
 * 验证用户是否登录
 */
exports.authUser = (req, res, next) => {
    var ep = new eventproxy();
    ep.fail(next);

    //Ensure current_user always has defined
    res.locals.current_user = null;
    if (config.debug && req.cookies['mock_user']) {
        var mockUser = JSON.parse(req.cookie['mock_user']);
        req.session.user = new UserModel(mockUser);
        return next();
    }

    ep.all('get_user', (user) => {
        if (!user) {
            return next();
        }
        user = res.locals.current_user = req.session.user = new UserModel(user);
        next();
    });

    if (req.session.user) {
        ep.emit('get_user', req.session.user);
    } else {
        var auth_token = req.signedCookies[config.auth_cookie_name];
        if (!auth_token) {
            return next();
        }

        var auth = auth_token.split('$$$$');
        var user_id = auth[0];
        UserProxy.getUserById(user_id, ep.done('get_user'));
    }
};
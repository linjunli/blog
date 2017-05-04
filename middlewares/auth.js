var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var UserModel = mongoose.model('User');
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
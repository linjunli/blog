var models = require('../models');
var User = models.User;
var uuid = require('uuid/v4');

/** 
 * 根据名字查找用户
 */
exports.getUserByLoginName = (nickname, callback) => {
    User.findOne({ nickname: new RegExp('^' + nickname + '$', "i") }, callback);
};

/**
 * 根据邮箱查找用户
 */
exports.getUserByEmail = (email, callback) => {
    User.findOne({ email: email }, callback);
};
/**
 * 新建一个用户
 * Callback:
 * -error, 数据库异常
 * - user, 用户
 * @param 
 * @param {Function} callback
 */
exports.newUser = (nickname, email, password, callback) => {
    var user = new User();
    user.nickname = nickname;
    user.email = email;
    user.password = password;
    user.accessToken = uuid();

    user.save(callback);
};
var path = require('path');

var config = {
    debug: true,
    name: 'blog',
    description: 'nodejs,blog',

    host: '127.0.0.1',
    port: '3000',

    //mongodb
    mongodb: 'mongodb://127.0.0.1/blog',
    // 邮箱配置
    mail_opts: {
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
            user: 'lilinjunwp@163.com',
            pass: 'lilinjun111'
        },
        // ignoreTLS: true,
    },
    session_secret: 'lilinjun',
    auth_cookie_name: 'lilinjun/blog',

    redis_host: '127.0.0.1',
    redis_port: '6379',
    redis_db: 0,
    redis_password: '',
}
module.exports = config;
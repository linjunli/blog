var config = require('../configs/config');
var Redis = require('ioredis');
var logger = require('./logger')

var client = new Redis({
    host: config.redis_host,
    port: config.redis_port,
    db: config.redis_db,
    password: config.redis_password
});

client.on('error', (err) => {
    if (err) {
        logger.error('connect to redis error :' + err);
        process.exit(1);
    }
})
exports = module.exports = client;
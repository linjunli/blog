const mongoose = require('mongoose');
const logger = require('../common/logger.js');
const config = require('../configs/config.js');

mongoose.connect(config.mongodb, {
    server: { poolSize: 20 }
}, (error) => {
    if (error) {
        logger.error('connec to %s error: ', config.mongodb, error.message);
        process.exit(1);
    }
});

require('./user');

exports.User = mongoose.model('User');
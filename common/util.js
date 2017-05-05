var bcrypt = require('bcryptjs');

exports.bhash = (str, callback) => {
    bcrypt.hash(str, 10, callback);
};
exports.bcompare = (str, hash, fn) => {
    bcrypt.compare(str, hash, fn);
};
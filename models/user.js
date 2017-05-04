const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    nickname: { type: String },
    password: { type: String },
    email: { type: String },
    accessToken: { type: String },
});
UserSchema.index({ nickname: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

mongoose.model('User', UserSchema);
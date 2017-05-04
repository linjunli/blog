const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    nickname: { type: String },
    pass: { type: String },
    email: { type: String }
});
UserSchema.index({ nickname: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

mongoose.model('User', UserSchema);
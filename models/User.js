const mongoose = require('mongoose');
const user = require('../schema/UserSchema');

const Schema = mongoose.Schema;

const UserSchema = new Schema(user);

module.exports = User = mongoose.model('users', UserSchema);

const mongoose = require('mongoose');
const user = require('../models/User');

const Schema = mongoose.Schema;

const UserSchema = new Schema(user);

module.exports = User = mongoose.model('users', UserSchema);

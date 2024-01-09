const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    posterId: String,
    datePosted: Date,
    description: String,
    pay: String
});

module.exports = mongoose.model('Task', taskSchema);
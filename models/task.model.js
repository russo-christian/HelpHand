const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    posterId: String,
    datePosted: Date,
    description: String,
    pay: String,
    location: String,
    imagePath: {
        type: String,
        default: ''
    } 
});

module.exports = mongoose.model('Task', taskSchema);
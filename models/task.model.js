const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    posterId: String,
    datePosted: Date,
    title: String,
    description: String,
    dueDate: Date,
    pay: Number,
    location: String,
    category: String,
    imagePath: {
        type: String,
        default: ''
    } 
});

module.exports = mongoose.model('Task', taskSchema);
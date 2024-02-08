const mongoose = require("mongoose");

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // This is a simple regex for email validation

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    match: emailRegex,
    required: true,
  },
  password: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  location: String,
  currentRating: {
    type: Number,
    default: 4,
    min: 0,
    max: 5,
  },
  tasksHelped: {
    type: Number,
    default: 0,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  seeker: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);

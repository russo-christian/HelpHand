const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
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

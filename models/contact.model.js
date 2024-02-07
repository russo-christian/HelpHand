const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  message: String,
});

module.exports = mongoose.model("Contact", userSchema);

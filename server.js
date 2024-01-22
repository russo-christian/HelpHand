const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/user.router");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB TODO: move db to .env file
mongoose
  .connect("mongodb://127.0.0.1:27017/helphanddb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/api/users", userRoutes);

// Serve the login page
app.get("/login", (req, res) => {
  // You can render your login page here or serve an HTML file
  res.sendFile(__dirname + "/views/login.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

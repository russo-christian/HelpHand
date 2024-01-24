require('dotenv').config();

// Create and configure Express
const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const userRoutes = require("./routers/user.router");
const taskRoutes = require("./routers/task.router");

//const app = express();
const base = `${__dirname}/public`;
const port = process.env.PORT;
const dbUri = process.env.DB_URI;

// Connect to MongoDB
mongoose
  .connect(dbUri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${base}/index.html`);
});

app.get("/login", (req, res) => {
  res.sendFile(`${base}/views/login.html`);
});

app.get("/Howitworks", (req, res) => {
  res.sendFile(`${base}/views/Aboutpage.html`);
});

app.get("/Helper", (req, res) => {
  res.sendFile(`${base}/views/Helper.html`);
});

app.get("/profile", (req, res) => {
  res.sendFile(`${base}/views/profile.html`);
});

app.get("/task", (req, res) => {
  res.sendFile(`${base}/views/Task.html`);
});

app.get("/login1", (req, res) => {
  res.sendFile(`${base}/views/login1.html`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

require('dotenv').config();

// Create and configure Express
const express = require("express");
const app = express();
app.use(express.json());

const socket = require("socket.io");

const mongoose = require("mongoose");
const userRoutes = require("./routers/user.router");
const taskRoutes = require("./routers/task.router");

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

app.get("/complete-registration", (req, res) => {
  res.sendFile(`${base}/views/login2.html`);
});

app.get("/chat", (req, res) => {
  res.sendFile(`${base}/views/chat.html`);
});

// Start the server
const server = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

const io = socket(server);

const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });

  socket.on("chat message", function (data) {
    io.emit("chat message", data);
  });
  
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

module.exports = app;

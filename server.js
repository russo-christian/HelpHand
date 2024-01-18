const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routers/user.router');

const app = express();
const base = `${__dirname}/public`;
const port = process.env.PORT || 3000;

// Connect to MongoDB TODO: move db to .env file
mongoose.connect('mongodb://localhost:27017/helphanddb').then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${base}/index.html`);
});

app.get("/Howitworks", (req, res) => {
  res.sendFile(`${base}/views/Aboutpage.html`);
});

app.get("/Helper", (req, res) => {
  res.sendFile(`${base}/views/Helper.html`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

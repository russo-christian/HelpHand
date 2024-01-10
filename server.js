const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routers/user.router');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB TODO: move db to .env file
mongoose.connect('mongodb://localhost:27017/helphanddb').then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
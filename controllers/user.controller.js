const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const userController = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
      await newUser.save();
      // Consider excluding sensitive information like password from the response
      res.status(201).send({ ...newUser._doc, password: undefined });
    } catch (error) {
      console.error("Error in createUser:", error);
      res.status(400).send(error);
    }
  },

  // Retrieve a user by id
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Update a user by id
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Delete a user by id
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send("User successfully deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // List all users
  listUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Search User by Username
  getUserByUsername: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Search User by Email
  getUserByEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getLoggedInUserByEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // User Login
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Implement session logic here if needed
        res.status(200).json({ message: "Logged in successfully", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userController;

const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const userController = {
  createUser: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        location: req.body.location,
        currentRating: req.body.currentRating,
        tasksHelped: req.body.tasksHelped,
        admin: req.body.admin,
        seeker: req.body.seeker,
      });
      await newUser.save();
      res.status(201).send({ ...newUser._doc, password: undefined });
    } catch (error) {
      console.error("Error in createUser:", error);
      res.status(400).send(error);
    }
  },

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

  updateUser: async (req, res) => {
    try {
      const updateData = {
        ...req.body,
      };
      if (req.body.password) {
        updateData.password = await bcrypt.hash(req.body.password, 10);
      }
      const user = await User.findByIdAndUpdate(req.params.id, updateData, {
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

  listUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

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

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
          message: "Logged in successfully",
          user: { ...user._doc, password: undefined },
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userController;

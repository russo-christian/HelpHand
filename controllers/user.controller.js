const User = require('../models/user.model');

const userController = {

    // Create a new user
    createUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).send(newUser);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Retrieve a user by id
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Update a user by id
    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).send();
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
                return res.status(404).send();
            }
            res.send(user);
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
    }
};

module.exports = userController;
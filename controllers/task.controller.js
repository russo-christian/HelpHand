const Task = require('../models/task.model');

const taskController = {

    // Create a new task
    createTask: async (req, res) => {
        try {
            const newTask = new task(req.body);
            await newTask.save();
            res.status(201).send(newtask);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Retrieve a task by id
    getTaskById: async (req, res) => {
        try {
            const task = await task.findById(req.params.id);
            if (!task) {
                return res.status(404).send();
            }
            res.send(task);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Update a task by id
    updateTask: async (req, res) => {
        try {
            const task = await task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!task) {
                return res.status(404).send();
            }
            res.send(task);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Delete a task by id
    deleteTask: async (req, res) => {
        try {
            const task = await task.findByIdAndDelete(req.params.id);
            if (!task) {
                return res.status(404).send();
            }
            res.send(task);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // List all tasks
    listTasks: async (req, res) => {
        try {
            const tasks = await task.find({});
            res.send(tasks);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = taskController;
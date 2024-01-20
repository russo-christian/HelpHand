const Task = require('../models/task.model');

const taskController = {

    // Create a new task
    createTask: async (req, res) => {
        try {
            const newTask = new Task(req.body);
            await newTask.save();
            res.status(201).send(newTask);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Retrieve a task by id
    getTaskById: async (req, res) => {
        try {
            console.log(req.params.id);
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).send('Task not found');
            }
            res.send(task);
        } catch (error) {
            res.status(500).send({ message: error.message, stack: error.stack });
        }
    },

    // Update a task by id
    updateTask: async (req, res) => {
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!task) {
                return res.status(404).send('Task not found');
            }
            res.send(task);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Delete a task by id
    deleteTask: async (req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);
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
            const tasks = await Task.find({});
            res.send(tasks);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = taskController;
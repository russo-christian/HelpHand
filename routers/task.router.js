const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/', taskController.listTasks);
router.get('/type/:category', taskController.getTasksByType);
router.get('/area/:location', taskController.getTasksByLocation);

module.exports = router;
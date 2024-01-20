const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.listUsers);

// API for searching
router.get('/search/username/:username', userController.getUserByUsername);
router.get('/search/email/:email', userController.getUserByEmail);

module.exports = router;
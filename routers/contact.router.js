const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

router.post('/', contactController.createContact);
router.get('/:id', contactController.getContactById);

module.exports = router;
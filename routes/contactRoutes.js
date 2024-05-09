
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { addMessageValidator, changeStatusValidator } = require('../validators/contactValidator');
const { validateRequest } = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/messages', authMiddleware, addMessageValidator, validateRequest, contactController.addMessage);

router.get('/messages', authMiddleware, contactController.listMessages);

router.put('/messages/:messageId/status', authMiddleware, changeStatusValidator, validateRequest, contactController.changeStatus);

module.exports = router;

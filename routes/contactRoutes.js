
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { addMessageValidator, changeStatusValidator , validateListMessages  } = require('../validators/contactValidator');
const {verifyToken,checkUserType} = require('../middleware/authMiddleware'); 

router.post('/contact-us/message', addMessageValidator, contactController.addMessage);

router.get('/contact-us/message', verifyToken ,checkUserType(['admin', 'staff']), validateListMessages ,  contactController.listMessages);

router.put('/contact-us/message/status/:messageId', verifyToken ,checkUserType(['admin', 'staff']), changeStatusValidator, contactController.changeStatus);

module.exports = router;

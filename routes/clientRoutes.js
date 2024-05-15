const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { listClientsValidator } = require('../validators/clientValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

// List clients
router.get('/clients', verifyToken, checkUserType(['admin', 'staff']), listClientsValidator, clientController.listClients);

module.exports = router;

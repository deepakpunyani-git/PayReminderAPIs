const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { listClientsValidator, changeClientStatusValidator } = require('../validators/clientValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

// List clients
router.get('/clients', verifyToken, checkUserType('admin'), listClientsValidator, clientController.listClients);

// Change client status
router.patch('/clients/:id/status', verifyToken, checkUserType('admin'), changeClientStatusValidator, clientController.changeClientStatus);

module.exports = router;

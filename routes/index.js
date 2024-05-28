const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const setupRoutes = require('./setupRoutes');
const contactRoutes = require('./contactRoutes');
const staffRoutes = require('./staffRoutes');
const clientRoutes = require('./clientRoutes');
const userRoutes = require('./user.Routes');
const payReminderRoutes = require('./payReminderRoutes');

router.use(setupRoutes);
router.use(authRoutes);
router.use(contactRoutes);
router.use(staffRoutes);
router.use(clientRoutes);
router.use(userRoutes);
router.use(payReminderRoutes);

module.exports = router;

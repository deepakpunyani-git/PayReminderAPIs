const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const planRoutes = require('./planRoutes');
const contactRoutes = require('./contactRoutes');
const staffRoutes = require('./staffRoutes');
const clientRoutes = require('./clientRoutes');
const userRoutes = require('./user.Routes');

router.use(planRoutes);
router.use(authRoutes);
router.use(contactRoutes);
router.use(staffRoutes);
router.use(clientRoutes);
router.use(userRoutes);

module.exports = router;

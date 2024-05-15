const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const planRoutes = require('./planRoutes');
const contactRoutes = require('./contactRoutes');
const staffRoutes = require('./staffRoutes');
const clientRoutes = require('./clientRoutes');

router.use(planRoutes);
router.use(authRoutes);
router.use(contactRoutes);
router.use(staffRoutes);
router.use(clientRoutes);

module.exports = router;

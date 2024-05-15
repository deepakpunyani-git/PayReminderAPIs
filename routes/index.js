const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const planRoutes = require('./planRoutes');
const contactRoutes = require('./contactRoutes');

router.use(planRoutes);
router.use(authRoutes);
router.use(contactRoutes);

module.exports = router;

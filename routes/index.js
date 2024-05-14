const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const planRoutes = require('./planRoutes');
router.use(planRoutes);
router.use(authRoutes);

module.exports = router;

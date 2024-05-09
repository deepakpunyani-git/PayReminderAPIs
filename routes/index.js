const express = require('express');
const router = express.Router();
// const userRoutes = require('./userRoutes');
const planRoutes = require('./planRoutes');
// const orderRoutes = require('./orderRoutes');
// const companyRoutes = require('./companyRoutes');
// const companyCustomerRoutes = require('./companyCustomerRoutes');


// router.use(companyCustomerRoutes);
router.use(planRoutes);
// router.use(userRoutes);
// router.use(eventorderRoutesType);
// router.use(orderRoutes);
// router.use(companyRoutes);

module.exports = router;

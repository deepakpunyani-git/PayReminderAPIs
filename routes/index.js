const express = require('express');
const app = express();

// Require route files
const userRoutes = require('./userRoutes');
const planRoutes = require('./planRoutes');
const orderRoutes = require('./orderRoutes');
const companyRoutes = require('./companyRoutes');
const companyCustomerRoutes = require('./companyCustomerRoutes');



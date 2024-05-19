const PayReminderPlan = require('../models/planModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const secretKey = process.env.JWT_SECRET;

exports.addPayReminderPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  try {
    const { name, features, yearlyPrice, monthlyPrice , total_companies , total_customers_in_company,total_sms,total_email  } = req.body;

    // Check if the plan name is already taken
    const existingPlan = await PayReminderPlan.findOne({ name });
    if (existingPlan) {
      return res.status(400).json({ message: 'Plan name already exists' });
    }

    const plan = new PayReminderPlan({ name, features, yearlyPrice, monthlyPrice , total_companies , total_customers_in_company,total_sms,total_email,createdBy:req.user._id });
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {

    res.status(400).send(error);
  }
};

// Update PayReminderPlan by ID
exports.updatePayReminderPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, features, yearlyPrice, monthlyPrice , total_companies , total_customers_in_company,total_sms,total_email  } = req.body;

    // Check if the plan name is already taken by another plan
    const existingPlan = await Plan.findOne({ name, _id: { $ne: id } });
    if (existingPlan) {
      return res.status(400).json({ message: 'Plan name already exists' });
    }

    const updatedPlan = await Plan.findByIdAndUpdate(id, { name, features, yearlyPrice, monthlyPrice, total_companies , total_customers_in_company,total_sms,total_email }, { new: true });
    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json(updatedPlan);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete PayReminderPlan by ID
exports.deletePayReminderPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const payReminderPlan = await PayReminderPlan.findByIdAndDelete(id);
    if (!payReminderPlan) {
      return res.status(404).json({ message: 'PayReminderPlan not found' });
    }
    res.json({ message: 'PayReminderPlan deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List all PayReminderPlans

exports.listPayReminderPlans = async (req, res) => {
  try {
    let query = PayReminderPlan.find();
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    const token = req.headers.authorization?.split(' ')[1];
    var userType;
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        userType = decoded?.usertype;
      });
    }


    if (userType) {
      if (userType !== 'admin' && userType !== 'staff') {
        query = query.select('name features yearlyPrice monthlyPrice');
      } else {
        query = query.populate('createdBy', 'username').populate('updatedBy', 'username');
      }
    } else {
      query = query.select('name features yearlyPrice monthlyPrice');

    }
    query = query.sort({ name: sortOrder });

    const payReminderPlans = await query.exec();
    res.json(payReminderPlans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

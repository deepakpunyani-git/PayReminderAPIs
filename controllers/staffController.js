const Staff = require('../models/userModel');
const { validationResult } = require('express-validator');

// Add staff
exports.addStaff = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    const { name, username, password } = req.body;
      
      // Check if the username is already taken
      const existingStaff = await Staff.findOne({ username });
      if (existingStaff) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const staff = new Staff({ name, username, password });
      await staff.save();
      res.status(201).send(staff);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  

// Update staff
exports.updateStaffName = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name } = req.body;
      const staff = await Staff.findByIdAndUpdate(id, { name, dateUpdated: Date.now() }, { new: true });
      if (!staff) {
        return res.status(404).send();
      }
      res.send(staff);
    } catch (error) {
      res.status(400).send(error);
    }
  };

// Change password
exports.changePassword = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).send();
    }
    staff.password = newPassword;
    await staff.save();
    res.send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update staff status
exports.updateStatus = async (req, res) => { 
       
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }        

  try {
    const { id } = req.params;
    const { status } = req.body;
    const staff = await Staff.findByIdAndUpdate(id, { status }, { new: true });
    if (!staff) {
      return res.status(404).send();
    }
    res.send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).send();
    }
    res.send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getStaffList = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { sortOrder } = req.query;
      let sortOption = { name: 1 }; // Default sort order is ascending
  
      if (sortOrder === 'desc') {
        sortOption = { name: -1 }; // Sort order is descending
      }
  
      const staffList = await Staff.find()
        .populate('createdBy', 'name')
        .populate('updatedBy', 'name')
        .sort(sortOption);
  
      res.send(staffList);
    } catch (error) {
      res.status(400).send(error);
    }
  }
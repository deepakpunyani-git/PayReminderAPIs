const Client = require('../models/userModel');
const { validationResult } = require('express-validator');


exports.changeClientStatus = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedClient = await Client.findByIdAndUpdate(id, { status }, { new: true });
      if (!updatedClient) {
        return res.status(404).json({ message: 'Client not found' });
      }
  
      res.json(updatedClient);
    } catch (error) {
      res.status(400).send(error);
    }
  };
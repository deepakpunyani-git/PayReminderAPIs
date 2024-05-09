const Client = require('../models/userModel');
const { validationResult } = require('express-validator');

exports.listClients = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, sortOrder = 'asc' } = req.query;
    const query = { usertype: 'client' };

    // Filter by name
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    // Sort by name
    const sortOption = { name: sortOrder === 'asc' ? 1 : -1 };

    const clients = await Client.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Client.countDocuments(query);

    res.json({
      clients,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.changeClientStatus = async (req, res) => {
  try {
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

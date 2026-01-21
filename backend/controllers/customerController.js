const Customer = require('../models/Customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    customer = await Customer.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    await Customer.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Customer removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

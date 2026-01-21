const SalesOrder = require('../models/SalesOrder');

// Get all sales orders
exports.getAllSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrder.find().populate('customer').populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sales order by ID
exports.getSalesOrderById = async (req, res) => {
  try {
    const order = await SalesOrder.findById(req.params.id).populate('customer').populate('items.product');
    if (!order) {
      return res.status(404).json({ msg: 'Sales Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create sales order
exports.createSalesOrder = async (req, res) => {
  try {
    const order = new SalesOrder(req.body);
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update sales order
exports.updateSalesOrder = async (req, res) => {
  try {
    let order = await SalesOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Sales Order not found' });
    }

    order = await SalesOrder.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete sales order
exports.deleteSalesOrder = async (req, res) => {
  try {
    let order = await SalesOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Sales Order not found' });
    }

    await SalesOrder.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Sales Order removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

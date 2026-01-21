const PurchaseOrder = require('../models/PurchaseOrder');

// Get all purchase orders
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().populate('supplier').populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get purchase order by ID
exports.getPurchaseOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id).populate('supplier').populate('items.product');
    if (!order) {
      return res.status(404).json({ msg: 'Purchase Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create purchase order
exports.createPurchaseOrder = async (req, res) => {
  try {
    const order = new PurchaseOrder(req.body);
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update purchase order
exports.updatePurchaseOrder = async (req, res) => {
  try {
    let order = await PurchaseOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Purchase Order not found' });
    }

    order = await PurchaseOrder.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete purchase order
exports.deletePurchaseOrder = async (req, res) => {
  try {
    let order = await PurchaseOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Purchase Order not found' });
    }

    await PurchaseOrder.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Purchase Order removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const GRN = require('../models/GRN');
const Product = require('../models/Product');

// Get all GRNs
exports.getAllGRNs = async (req, res) => {
  try {
    const grns = await GRN.find().populate('purchaseOrder').populate('items.product');
    res.json(grns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get GRN by ID
exports.getGRNById = async (req, res) => {
  try {
    const grn = await GRN.findById(req.params.id).populate('purchaseOrder').populate('items.product');
    if (!grn) {
      return res.status(404).json({ msg: 'GRN not found' });
    }
    res.json(grn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create GRN
exports.createGRN = async (req, res) => {
  try {
    const grn = new GRN(req.body);
    await grn.save();

    // Update product quantities
    for (let item of grn.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.quantity += item.receivedQuantity;
        await product.save();
      }
    }

    res.json(grn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update GRN
exports.updateGRN = async (req, res) => {
  try {
    let grn = await GRN.findById(req.params.id);
    if (!grn) {
      return res.status(404).json({ msg: 'GRN not found' });
    }

    grn = await GRN.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    res.json(grn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete GRN
exports.deleteGRN = async (req, res) => {
  try {
    let grn = await GRN.findById(req.params.id);
    if (!grn) {
      return res.status(404).json({ msg: 'GRN not found' });
    }

    await GRN.findByIdAndRemove(req.params.id);
    res.json({ msg: 'GRN removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Supplier = require('../models/Supplier');

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ msg: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create supplier
exports.createSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    let supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ msg: 'Supplier not found' });
    }

    supplier = await Supplier.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete supplier
exports.deleteSupplier = async (req, res) => {
  try {
    let supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ msg: 'Supplier not found' });
    }

    await Supplier.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Supplier removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

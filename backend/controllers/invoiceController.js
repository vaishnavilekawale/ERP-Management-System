const Invoice = require('../models/Invoice');

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('customer')
      .populate('supplier')
      .populate('items.product');
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('customer')
      .populate('supplier')
      .populate('items.product');
    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update invoice
exports.updateInvoice = async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete invoice
exports.deleteInvoice = async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    await Invoice.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Invoice removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

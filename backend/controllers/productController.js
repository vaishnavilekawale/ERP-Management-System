const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('supplier');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier');
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, sku, category, price, quantity, reorderLevel, supplier } = req.body;

    const product = new Product({
      name,
      description,
      sku,
      category,
      price,
      quantity,
      reorderLevel,
      supplier,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await Product.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Product removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

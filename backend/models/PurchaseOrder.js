const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  poNumber: {
    type: String,
    required: true,
    unique: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['draft', 'confirmed', 'shipped', 'received', 'cancelled'],
    default: 'draft',
  },
  poDate: Date,
  expectedDeliveryDate: Date,
  actualDeliveryDate: Date,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);

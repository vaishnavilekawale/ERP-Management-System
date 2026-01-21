const mongoose = require('mongoose');

const salesOrderSchema = new mongoose.Schema({
  soNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
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
      discount: Number,
      total: Number,
    },
  ],
  totalAmount: Number,
  tax: Number,
  shippingCost: Number,
  grandTotal: Number,
  status: {
    type: String,
    enum: ['draft', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'draft',
  },
  soDate: Date,
  expectedDeliveryDate: Date,
  actualDeliveryDate: Date,
  shippingAddress: String,
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

module.exports = mongoose.model('SalesOrder', salesOrderSchema);

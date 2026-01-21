const mongoose = require('mongoose');

const grnSchema = new mongoose.Schema({
  grnNumber: {
    type: String,
    required: true,
    unique: true,
  },
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PurchaseOrder',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      orderedQuantity: Number,
      receivedQuantity: Number,
      condition: {
        type: String,
        enum: ['good', 'damaged', 'partial'],
        default: 'good',
      },
      notes: String,
    },
  ],
  grnDate: Date,
  status: {
    type: String,
    enum: ['pending', 'completed', 'partially_received'],
    default: 'pending',
  },
  receivedBy: String,
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

module.exports = mongoose.model('GRN', grnSchema);

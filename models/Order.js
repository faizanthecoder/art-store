const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String
  },
  items: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: Number,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order; // ✅ make sure you export the model

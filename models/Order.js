const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  customer: {
    name: String,
    phone: String,
    address: String
  },
  total: Number,
  status: {
    type: String,
    default: "PAID"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);

const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // ✅ match your export

router.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

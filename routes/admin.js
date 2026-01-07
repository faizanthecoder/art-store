const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");

// Simple hardcoded admin (later can make DB)
const ADMIN = { username: "admin", password: "admin123" };

// LOGIN PAGE
// router.get("/login", (req, res) => {
// res.sendFile(__dirname + "/../views/login.html");
// });

// LOGIN HANDLER
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (username === ADMIN.username && password === ADMIN.password) {
//     res.redirect("/admin/dashboard");
//   } else {
//     res.send("Invalid credentials");
//   }
// });

// GET orders for admin panel
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE order status
router.post("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DASHBOARD
router.get("/dashboard", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin.html"));
});

// GET ALL PRODUCTS (JSON)
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADD PRODUCT
router.post("/products", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const p = new Product({ name, price, image, description });
    await p.save();
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE PRODUCT
router.post("/products/:id", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price, image, description });
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE PRODUCT
router.post("/products/:id/delete", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

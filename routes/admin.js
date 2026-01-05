const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");

// Simple hardcoded admin (later can make DB)
const ADMIN = { username: "admin", password: "admin123" };

// LOGIN PAGE
router.get("/login", (req, res) => {
  res.sendFile(__dirname + "/../views/login.html");
});

// LOGIN HANDLER
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN.username && password === ADMIN.password) {
    res.redirect("/admin/dashboard");
  } else {
    res.send("Invalid credentials");
  }
});

// DASHBOARD
router.get("/dashboard", async (req, res) => {
  res.sendFile(__dirname + "/../views/admin.html");
});

// GET ALL PRODUCTS (JSON)
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD PRODUCT
router.post("/products", async (req, res) => {
  const { name, price, image, description } = req.body;
  const p = new Product({ name, price, image, description });
  await p.save();
  res.redirect("/admin/dashboard");
});

// UPDATE PRODUCT
router.post("/products/:id", async (req, res) => {
  const { name, price, image, description } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, image, description });
  res.redirect("/admin/dashboard");
});

// DELETE PRODUCT
router.post("/products/:id/delete", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin/dashboard");
});

// GET ORDERS
router.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;

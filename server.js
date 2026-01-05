require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const adminRoutes = require("./routes/admin");
const Order = require("./models/Order");
const Product = require("./models/Product");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("MongoDB Atlas connected ✅"))
  .catch(err=> console.error(err));

// Routes
app.use("/admin", adminRoutes);

// PUBLIC VIEWS
app.get("/", async (req,res)=>{
  res.sendFile(path.join(__dirname,"views/index.html"));
});
app.get("/cart", (req,res)=> res.sendFile(path.join(__dirname,"views/cart.html")));
app.get("/checkout", (req,res)=> res.sendFile(path.join(__dirname,"views/checkout.html")));
app.get("/success", (req,res)=> res.sendFile(path.join(__dirname,"views/success.html")));
app.get("/about", (req,res)=> res.sendFile(path.join(__dirname,"views/about.html")));
app.get("/contact", (req,res)=> res.sendFile(path.join(__dirname,"views/contact.html")));
app.get("/privacy", (req,res)=> res.sendFile(path.join(__dirname,"views/privacy.html")));

const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/place-order", async (req,res)=>{
  const { name, phone, address, cartData } = req.body;
  const items = JSON.parse(cartData || "[]");
  const order = new Order({ name, phone, address, items });
  await order.save();

  // WhatsApp Notification
  const itemList = items.map(i=> i.name + " $" + i.price).join(", ");
  const msg = `Hello ${name}, your order has been placed!\nItems: ${itemList}\nTotal: $${items.reduce((a,b)=>a+b.price,0)}\nWe will contact you for delivery.`;
  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP,
    to: `whatsapp:+${phone}`, // make sure customer includes country code
    body: msg
  });

  res.redirect("/success");
});


app.listen(process.env.PORT || 3000, ()=> console.log("Server running..."));

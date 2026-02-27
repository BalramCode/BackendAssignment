const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoDB");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 CONNECT ROUTES HERE
const authRoutes = require("./routes/authRoutes");
const productRoutes=require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});
const protect = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You accessed a protected route",
    user: req.user,
  });
});

module.exports = app;

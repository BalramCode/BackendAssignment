const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/", protect, adminMiddleware, createProduct);
// @route   PUT /api/products/:id
// @desc    Update product
// @access  Admin only
router.put("/:id", protect, adminMiddleware, updateProduct);

// Admin only
// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Admin only
router.delete("/:id", protect, adminMiddleware, deleteProduct);

module.exports = router;

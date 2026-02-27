const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
} = require("../controllers/authController");

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", loginUser);
const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
    "/admin",
    protect,
    adminMiddleware,
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin",
        });
    }
);

module.exports = router;

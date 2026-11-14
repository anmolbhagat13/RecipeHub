const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Get current user (protected route)
router.get("/me", authMiddleware, getCurrentUser);

// Logout route
router.post("/logout", logoutUser);

module.exports = router;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    // Check for empty fields
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        { username: username.trim() },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email or username already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    // Send response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email or username already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser };

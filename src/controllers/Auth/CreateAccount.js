const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/Auth/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.createAccount = async (req, res) => {
  try {
    const { name, email, password, role, profileImage } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists." });
    }
    // Validate role if provided
    const allowedRoles = ["admin", "manager", "user"];
    let userRole = "user";
    if (role && allowedRoles.includes(role)) {
      userRole = role;
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      profileImage: profileImage || "",
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};

// Example: Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  console.log("this is update function ");

  try {
    const { id } = req.params;
    const { name, password, role, profileImage, status } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (status) updateData.status = status;
    if (profileImage !== undefined) updateData.profileImage = profileImage;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};

// Get single user details
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};

// Request password reset (send OTP to email)
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 15 minutes.`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "OTP sent to email." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};

// Reset password using OTP
exports.resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or email." });
    }
    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired." });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password reset successful." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};

// Get the count of all users
exports.countUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};

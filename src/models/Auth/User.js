const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user",
    },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    otp: { type: String }, // For password reset OTP
    otpExpiry: { type: Date }, // OTP expiry time
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);

const User = require("../../models/Auth/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1d" }
  );
  // Exclude password from user data
  const { password: _, ...userData } = user.toObject();
  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    userName: user.name,
  });
};

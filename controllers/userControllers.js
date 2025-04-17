const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// =========================
// Helper: Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// =========================
// description: Register a new user
// @route   POST /api/users/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// description: Login user
// @route   POST /api/users/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// description: Logout user
// @route   POST /api/users/logout
exports.logoutUser = async (req, res) => {
  // If using token-based auth, logout is frontend-side
  res.json({ message: 'User logged out successfully' });
};

// =========================
// description: Get user profile
// @route   GET /api/users/profile
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

// =========================
// description: Update user profile
// @route   PUT /api/users/profile
exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    token: generateToken(updatedUser._id)
  });
};

// =========================
// description: Forgot password
// @route   POST /api/users/forgot-password
exports.forgotPassword = async (req, res) => {
  // In real app: generate reset token, send email
  res.json({ message: 'Reset link sent (mock)' });
};

// =========================
// description: Reset password
// @route   POST /api/users/reset-password
exports.resetPassword = async (req, res) => {
  // In real app: verify token and reset password
  res.json({ message: 'Password reset successful (mock)' });
};

// =========================
// description: Get all addresses
// @route   GET /api/users/addresses
exports.getUserAddresses = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.addresses);
};

// =========================
// description: Add a new address
// @route   POST /api/users/addresses
exports.addAddress = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.addresses.push(req.body);
  await user.save();
  res.status(201).json(user.addresses);
};

// =========================
// description: Update an address
// @route   PUT /api/users/addresses/:id
exports.updateAddress = async (req, res) => {
  const user = await User.findById(req.user.id);
  const address = user.addresses.id(req.params.id);

  if (!address) return res.status(404).json({ message: 'Address not found' });

  Object.assign(address, req.body);
  await user.save();
  res.json(user.addresses);
};

// =========================
// description: Delete an address
// @route   DELETE /api/users/addresses/:id
exports.deleteAddress = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.addresses = user.addresses.filter(addr => addr._id.toString() !== req.params.id);
  await user.save();
  res.json(user.addresses);
};

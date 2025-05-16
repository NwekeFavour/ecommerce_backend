const express = require('express');
const router = express.Router();
const createBasicRateLimiter = require("../middleware/rate.limit.js")
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress  
} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

// Registration and Authentication
router.post('/register', createBasicRateLimiter(100, 600000), registerUser);
router.post('/login', createBasicRateLimiter(100, 600000), loginUser);
router.post('/logout', createBasicRateLimiter(100, 600000), protect, logoutUser);

// Password Recovery
router.post('/forgot-password', createBasicRateLimiter(100, 600000),  forgotPassword);
router.post('/reset-password/:resetToken', createBasicRateLimiter(100, 600000),  resetPassword); // (this is for resetting after getting token)

// Profile
router.get('/profile', createBasicRateLimiter(100, 600000), protect, getUserProfile);
router.put('/profile', createBasicRateLimiter(100, 600000), protect, updateUserProfile);

// Address Management
router.get('/addresses', createBasicRateLimiter(100, 600000), protect, getUserAddresses);
router.post('/addresses', createBasicRateLimiter(100, 600000), protect, addAddress);
router.put('/addresses/:id', createBasicRateLimiter(100, 600000),  protect, updateAddress);
router.delete('/addresses/:id', createBasicRateLimiter(100, 600000), protect, deleteAddress);

module.exports = router;

const express = require('express');
const router = express.Router();
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
router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.post('/users/logout', protect, logoutUser);

// Password Recovery
router.post('/users/forgot-password', forgotPassword);
router.post('/users/reset-password', resetPassword);

// Profile
router.get('/users/profile', protect, getUserProfile);
router.put('/users/profile', protect, updateUserProfile);

// Address Management
router.get('/users/addresses', protect, getUserAddresses);
router.post('/users/addresses', protect, addAddress);
router.put('/users/addresses/:id', protect, updateAddress);
router.delete('/users/addresses/:id', protect, deleteAddress);

module.exports = router;

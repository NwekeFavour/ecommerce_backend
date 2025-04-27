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
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);

// Password Recovery
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword); // (this is for resetting after getting token)

// Profile
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Address Management
router.get('/addresses', protect, getUserAddresses);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:id', protect, updateAddress);
router.delete('/addresses/:id', protect, deleteAddress);

module.exports = router;

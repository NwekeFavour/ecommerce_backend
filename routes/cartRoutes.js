const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Ensure the user is authenticated
const {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart
} = require('../controllers/cartController');

// @route   GET /api/cart
// description:    Retrieve current user's cart
// @access  Private
router.get('/', protect, getCart);

// @route   POST /api/cart/items
// description:    Add item to cart (productId, quantity)
// @access  Private
router.post('/items', protect, addItemToCart);

// @route   PUT /api/cart/items/:itemId
// description:    Update item quantity
// @access  Private
router.put('/items/:itemId', protect, updateItemQuantity);

// @route   DELETE /api/cart/items/:itemId
// description:    Remove an item from cart
// @access  Private
router.delete('/items/:itemId', protect, removeItemFromCart);

// @route   DELETE /api/cart
// description:    Clear the entire cart
// @access  Private
router.delete('/', protect, clearCart);

module.exports = router;

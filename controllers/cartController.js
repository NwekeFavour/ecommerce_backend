const Cart = require('../models/cart');
const Product = require('../models/products');

// description    Retrieve the current user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error, unable to fetch cart' });
  }
};

// description    Add item to cart
// @route   POST /api/cart/items
// @access  Private
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create the cart for the user
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if the item is already in the cart
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error, unable to add item to cart' });
  }
};

// description    Update item quantity in cart
// @route   PUT /api/cart/items/:itemId
// @access  Private
const updateItemQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    // Find cart and update item quantity
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error, unable to update item' });
  }
};

// description    Remove item from cart
// @route   DELETE /api/cart/items/:itemId
// @access  Private
const removeItemFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find the cart and remove item
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.remove();
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error, unable to remove item' });
  }
};

// description    Clear the entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    // Find the cart and clear items
    const cart = await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] }, { new: true });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error, unable to clear cart' });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart
};

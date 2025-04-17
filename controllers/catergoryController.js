const Category = require('../models/category');
const Product = require('../models/products'); // Assuming you have a Product model

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error, unable to fetch categories' });
  }
};

// @desc    Get all products in a specific category
// @route   GET /api/categories/:id/products
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await Product.find({ category: req.params.id }); // Assuming 'category' field in Product model
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error, unable to fetch products' });
  }
};

module.exports = {
  getAllCategories,
  getProductsByCategory
};

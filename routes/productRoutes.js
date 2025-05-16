const express = require("express")
const createBasicRateLimiter = require("../middleware/rate.limit.js")
const router= express.Router();
const {
    getAllProducts,
    getProductById, 
    searchProducts, 
    createProduct, 
    updateProduct,     
    deleteProduct   
} = require("../controllers/productControllers")
const { protect } = require('../middleware/authMiddleware');
const {adminOnly} = require("../middleware/adminMiddleware");//my vscode was acting crazy on here

// Public routes (available for all users)
router.get('/', createBasicRateLimiter(100, 600000), getAllProducts); // List all products
router.get('/:id', createBasicRateLimiter(100, 600000), getProductById); // Get a single product by ID
router.get('/search', createBasicRateLimiter(100, 600000), searchProducts); // Search products by keyword

// Admin routes (only accessible to admins)
router.post('/', createBasicRateLimiter(100, 600000), protect, adminOnly, createProduct); // Create a new product
router.put('/:id', createBasicRateLimiter(100, 600000),  protect, adminOnly, updateProduct); // Update product
router.delete('/:id', createBasicRateLimiter(100, 600000), protect, adminOnly, deleteProduct); // Delete a product

module.exports = router;

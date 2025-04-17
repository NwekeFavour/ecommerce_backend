const express = require("express")
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
const {adminOnly} = require("../middleware/adminMIddleware");//my vscode was acting crazy on here

// Public routes (available for all users)
router.get('/', getAllProducts); // List all products
router.get('/:id', getProductById); // Get a single product by ID
router.get('/search', searchProducts); // Search products by keyword

// Admin routes (only accessible to admins)
router.post('/', protect, adminOnly, createProduct); // Create a new product
router.put('/:id', protect, adminOnly, updateProduct); // Update product
router.delete('/:id', protect, adminOnly, deleteProduct); // Delete a product

module.exports = router;

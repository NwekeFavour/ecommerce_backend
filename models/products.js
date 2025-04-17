const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be a positive number']
  },
  category: {
    type: String,
    required: [true, 'Product category is required']
  },
  brand: {
    type: String,
    default: ''
  },
  images: [
    {
      type: String, // Image URLs (can be local paths or cloud URLs)
      required: true
    }
  ],
  stock: {
    type: Number,
    required: [true, 'Stock count is required'],
    min: [0, 'Stock must be a non-negative number']
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  // Optional: linked reviews (if implemented later)
  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

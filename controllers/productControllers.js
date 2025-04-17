const Product = require("../models/products")

// ===============================
//description:    Get all products (with optional filters)
// @route   GET /api/products
exports.getAllProducts = async (req, res) => {
    try {
      const { category, sort, page = 1, limit = 10 } = req.query;
      const filter = category ? { category } : {};
      const sortBy = sort === 'price' ? { price: 1 } : { createdAt: -1 };
  
      const products = await Product.find(filter)
        .sort(sortBy)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      res.json(products);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
  // ===============================
  //description:    Get a single product by ID
  // @route   GET /api/products/:id
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: 'Product not found' });
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
  // ===============================
  //description:    Search products by keyword
  // @route   GET /api/products/search?query=keyword
  exports.searchProducts = async (req, res) => {
    try {
      const keyword = req.query.query;
      const products = await Product.find({
        name: { $regex: keyword, $options: 'i' },
      });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ===============================
  //description:    Create a new product (admin only)
  // @route   POST /api/products
  exports.createProduct = async (req, res) => {
    try {
      const { name, description, price, category, countInStock, image } = req.body;
  
      const product = new Product({
        name,
        description,
        price,
        category,
        countInStock,
        image,
        createdBy: req.user._id,
      });
  
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ===============================
  //description:    Update a product (admin only)
  // @route   PUT /api/products/:id
  exports.updateProduct = async (req, res) => {
    try {
      const { name, description, price, category, countInStock, image } = req.body;
  
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: 'Product not found' });
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      product.image = image || product.image;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ===============================
  //description:    Delete a product (admin only)
  // @route   DELETE /api/products/:id
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: 'Product not found' });
  
      await product.remove();
      res.json({ message: 'Product removed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
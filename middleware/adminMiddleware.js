const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model with a role field

// Admin-only access middleware
const adminOnly = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    req.user = decoded; // Attach decoded user info to the request object

    // Check if the user is an admin
    const user = await User.findById(req.user.id); // Assuming 'id' is stored in JWT
    if (user && user.isAdmin) {
      return next(); // User is admin, allow the request to proceed
    } else {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { adminOnly };

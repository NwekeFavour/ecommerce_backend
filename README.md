
---

# 🛒 E-Commerce Backend API

This is the backend API for an e-commerce platform. It handles user authentication, product listings, cart management, and order processing. Built with RESTful principles, it supports both user and admin functionalities.

## 🔗 Base URL

```
https://ecommerce-backend-12e3.onrender.com/
```

---

## 📦 Features

- User Authentication & Profile Management  
- Product Browsing & Management  
- Cart & Checkout System  
- Order Management  
- Admin Controls for Product & Order Management

---

## 📁 API Endpoints

### 1️⃣ **User Management**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/register` | Register a new user (name, email, password, etc.) |
| `POST` | `/users/login` | Authenticate a user and return a JWT token |
| `POST` | `/users/logout` | Logout user (invalidate token if applicable) |
| `GET` | `/users/profile` | Get authenticated user's profile |
| `PUT` | `/users/profile` | Update user profile (name, address, etc.) |
| `POST` | `/users/forgot-password` | Request password reset link |
| `POST` | `/users/reset-password` | Reset password with token |
| `GET` | `/users/addresses` | List all saved addresses |
| `POST` | `/users/addresses` | Add a new address |
| `PUT` | `/users/addresses/:id` | Update a specific address |
| `DELETE` | `/users/addresses/:id` | Delete an address |

**Note:** Authenticated endpoints require JWT token in `Authorization` header:
  
```
Authorization: Bearer <your_token>
```

---

### 2️⃣ **Product Management**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | List all products (supports filtering, sorting, pagination) |
| `GET` | `/products/:id` | Get details of a specific product |
| `GET` | `/products/search?query=keyword` | Search products by keyword |
| `GET` | `/categories` | List all product categories |
| `GET` | `/categories/:id/products` | List products in a specific category |
| `POST` | `/products` | **(Admin)** Create a new product |
| `PUT` | `/products/:id` | **(Admin)** Update product details |
| `DELETE` | `/products/:id` | **(Admin)** Delete a product |

Use query parameters like `?category=electronics&sort=price&limit=10&page=2` to paginate and filter.

---

### 3️⃣ **Shopping Cart**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cart` | Retrieve current user's cart |
| `POST` | `/cart/items` | Add item to cart (productId, quantity) |
| `PUT` | `/cart/items/:itemId` | Update item quantity |
| `DELETE` | `/cart/items/:itemId` | Remove an item from cart |
| `DELETE` | `/cart` | Clear the entire cart |

---

### 4️⃣ **Checkout & Orders**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/checkout` | Validate cart, shipping, and payment for checkout |
| `POST` | `/orders` | Create an order after successful checkout |
| `GET` | `/orders` | List orders of the authenticated user |
| `GET` | `/orders/:id` | Get details of a specific order |
| `POST` | `/orders/:id/cancel` | Cancel an order (if eligible) |
| `GET` | `/orders/all` | **(Admin)** View all orders |
| `PUT` | `/orders/:id/status` | **(Admin)** Update order status (e.g., shipped, delivered) |

---

## 🛡️ Authentication

Most endpoints (except registration, login, and password reset) require a valid JWT. Include the token in the headers as:

```
Authorization: Bearer <your_token>
```

---

## ⚙️ Setup & Installation (Optional Section)

```bash
git clone https://github.com/NwekeFavour/ecommerce_backend.git
cd ecommerce_backend
npm install
node index || nodemon
```

Configure environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

---

## 🧑‍💻 Contributing

Pull requests are welcome. Please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT License

---

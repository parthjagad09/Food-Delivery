// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// require('dotenv').config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors()); // Enable CORS for frontend communication
// app.use(express.json()); // Parse JSON request bodies

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/restaurants', require('./routes/restaurants'));
// app.use('/api/orders', require('./routes/orders'));

// // Health check endpoint
// app.get('/', (req, res) => {
//   res.json({ message: 'Food Delivery API is running!' });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const app = express();

// 1. Connect to MongoDB
connectDB();

// 2. Middleware to handle CORS (Using your robust Expense Tracker config)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 3. Built-in Middleware
app.use(express.json());

// 4. Static folder for Restaurant/Food images
// This allows you to access images via http://localhost:5000/uploads/pizza.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 5. Routes (Matching your Food App structure)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/restaurants", require("./routes/restaurants"));
app.use("/api/orders", require("./routes/orders"));
app.use('/api/ai', require('./routes/ai'));
app.use("/api/user", authRouter);

// Health check / Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Food Delivery API is running smoothly!" });
});

// 6. Global Error Handling Middleware (Optional but recommended)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
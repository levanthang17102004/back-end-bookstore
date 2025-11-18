/** @format */
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./src/config/connectDb');
const errorMiddleware = require('./src/middleware/errorMiddleware');

// ROUTES
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const bookRoutes = require('./src/routes/bookRoutes');
const bookStoreRoutes = require('./src/routes/bookStoreRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const notificationRoutes = require('./src/routes/notificationRouter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static image folder
app.use('/images', express.static(path.join(__dirname, '/src/public/images')));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/bookstore', bookStoreRoutes);
app.use('/category', categoryRoutes);
app.use('/order', orderRoutes);
app.use('/review', reviewRoutes);
app.use('/notification', notificationRoutes);

// Error handler
app.use(errorMiddleware);

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on: http://localhost:${PORT}`);
});

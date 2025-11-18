const express = require('express');
const bookstoreRouter = express.Router();

const {
    getBookStores,
    topRatingStores,
    newBookStores,
    topFreeshipStores,
    getBookStoreById,
    getBookStoresByName
} = require('../controllers/bookStoreController');

const verifyToken = require('../middleware/authMiddleware');

// 📘 Lấy tất cả cửa hàng
bookstoreRouter.get('/', getBookStores);

// 📘 Tạo cửa hàng mới (chỉ admin hoặc đã đăng nhập)
bookstoreRouter.post('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Create bookstore endpoint' });
});

module.exports = bookstoreRouter;

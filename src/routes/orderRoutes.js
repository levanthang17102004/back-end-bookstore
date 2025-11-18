const express = require('express');
const { placeAnOrder, getAllOrders } = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');

const orderRouter = express.Router();

// 🛒 Đặt hàng mới
// POST /api/orders
orderRouter.post('/', verifyToken, placeAnOrder);

// 📦 Lấy tất cả đơn hàng của người dùng (đã đăng nhập)
// GET /api/orders?page=1&limit=10
orderRouter.get('/', verifyToken, getAllOrders);

module.exports = orderRouter;

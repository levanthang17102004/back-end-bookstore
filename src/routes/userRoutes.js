// routes/userRoutes.js
const express = require('express');
const { updateProfile, changePassword } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// 🧩 Cập nhật thông tin người dùng (họ tên, địa chỉ, ảnh, v.v.)
router.patch('/profile', verifyToken, updateProfile);

// 🔐 Đổi mật khẩu người dùng
router.post('/change-password', verifyToken, changePassword);

module.exports = router;

/** @format */

const express = require('express');
const router = express.Router();

const {
    register,
    login,
    verification,
    forgotPassword,
    getAccount,
    handleLoginWithGoogle,
} = require('../controllers/authController');

// Middleware xác thực JWT (export trực tiếp)
const protect = require('../middleware/authMiddleware');

// 📌 Route: Đăng ký tài khoản
router.post('/register', register);

// 📌 Route: Xác thực mã email (OTP)
router.post('/verify', verification);

// 📌 Route: Đăng nhập
router.post('/login', login);

// 📌 Route: Quên mật khẩu
router.post('/forgot-password', forgotPassword);

// 📌 Route: Lấy thông tin tài khoản (cần token)
router.get('/account', protect, getAccount);

// 📌 Route: Đăng nhập bằng Google
router.post('/google-login', handleLoginWithGoogle);

module.exports = router;

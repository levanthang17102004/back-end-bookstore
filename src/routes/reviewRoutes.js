const express = require('express');
const router = express.Router();
const { reviewBook, getBookReviews, deleteReview } = require('../controllers/reviewController');
const protect = require('../middleware/authMiddleware'); // sửa ở đây

// 📌 Route: Thêm hoặc cập nhật đánh giá sách (cần đăng nhập)
router.post('/', protect, reviewBook);

// 📌 Route: Lấy danh sách đánh giá của một sách (không cần đăng nhập)
router.get('/:bookId', getBookReviews);

// 📌 Route: Xóa đánh giá của chính người dùng (cần đăng nhập)
router.delete('/:bookId', protect, deleteReview);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
    getBooksByCategory,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');

// Lấy sách theo thể loại
router.get('/category/:categoryId', getBooksByCategory);

// Tạo sách mới
router.post('/', createBook);

// Cập nhật sách
router.put('/:bookId', updateBook);

// Xóa sách
router.delete('/:bookId', deleteBook);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  getCategoryById,
} = require('../controllers/categoryController');

// Lấy tất cả danh mục
router.get('/', getAllCategories);

// Tạo danh mục mới
router.post('/', createCategory);

// Lấy chi tiết danh mục theo ID
router.get('/:categoryId', getCategoryById);

module.exports = router;

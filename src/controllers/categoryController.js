const Category = require('../models/categoryModel');

// 📌 Lấy tất cả danh mục sách
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully',
            data: categories,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// 📌 Tạo mới một danh mục sách
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const existing = await Category.findOne({ name });
        if (existing) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const newCategory = await Category.create({ name, description });
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: newCategory,
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error });
    }
};

// 📌 Lấy chi tiết một danh mục (nếu bạn cần)
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
};

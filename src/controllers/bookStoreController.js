const asyncHandler = require('express-async-handler');
const BookStore = require('../models/bookStoreModel'); // Cửa hàng sách
const Category = require('../models/categoryModel');   // Danh mục (giống Menu)
const Book = require('../models/bookModel');           // Sách (giống MenuItem)

/* 🏪 Lấy tất cả cửa hàng sách */
const getBookStores = asyncHandler(async (req, res) => {
    const stores = await BookStore.find();
    res.status(200).json({
        statusCode: 200,
        message: 'Fetch all book stores successfully',
        data: stores,
    });
});

/* ⭐ Lấy top cửa hàng có đánh giá cao nhất */
const topRatingStores = asyncHandler(async (req, res) => {
    const { limit = 10 } = req.body;

    const stores = await BookStore.find({ isActive: true })
        .sort({ rating: -1 })
        .limit(parseInt(limit, 10));

    if (!stores.length) {
        return res.status(404).json({
            success: false,
            message: 'No top-rated book stores found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Top rated book stores fetched successfully',
        data: stores,
    });
});

/* 🆕 Lấy danh sách cửa hàng mới nhất */
const newBookStores = asyncHandler(async (req, res) => {
    const { limit = 10 } = req.body;

    const stores = await BookStore.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(parseInt(limit, 10));

    if (!stores.length) {
        return res.status(404).json({
            success: false,
            message: 'No new book stores found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'New book stores fetched successfully',
        data: stores,
    });
});

/* 🚚 (Tuỳ chọn) Lấy cửa hàng freeship hoặc nổi bật */
const topFreeshipStores = asyncHandler(async (req, res) => {
    const stores = await BookStore.find({ isActive: true }).sort({ rating: -1 });

    if (!stores.length) {
        return res.status(404).json({
            success: false,
            message: 'No top freeship stores found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Top freeship book stores fetched successfully',
        data: stores,
    });
});

/* 📚 Lấy chi tiết 1 cửa hàng + danh mục + sách */
const getBookStoreById = asyncHandler(async (req, res) => {
    const storeId = req.params.id;
    const store = await BookStore.findById(storeId);

    if (!store) {
        return res.status(404).json({
            statusCode: 404,
            message: 'Book store not found',
        });
    }

    // Lấy danh mục thuộc cửa hàng
    const categories = await Category.find({ store: storeId });

    // Lấy từng danh mục và tất cả sách trong danh mục đó
    const categoryWithBooks = await Promise.all(
        categories.map(async (category) => {
            const books = await Book.find({ category: category._id });
            return {
                ...category.toObject(),
                books,
            };
        })
    );

    res.status(200).json({
        statusCode: 200,
        message: 'Fetch book store by id successfully',
        data: {
            ...store.toObject(),
            categories: categoryWithBooks,
        },
    });
});

/* 🔍 Tìm kiếm cửa hàng theo tên (có phân trang) */
const getBookStoresByName = asyncHandler(async (req, res) => {
    const { current = 1, pageSize = 10, name = '' } = req.query;
    const currentPage = parseInt(current, 10);
    const size = parseInt(pageSize, 10);
    const nameRegex = new RegExp(name, 'i');

    const [stores, total] = await Promise.all([
        BookStore.find({ name: { $regex: nameRegex } })
            .skip((currentPage - 1) * size)
            .limit(size),
        BookStore.countDocuments({ name: { $regex: nameRegex } }),
    ]);

    res.status(200).json({
        statusCode: 200,
        message: 'Fetch book stores successfully',
        data: {
            meta: {
                current: currentPage,
                pageSize: size,
                total,
                pages: Math.ceil(total / size),
            },
            results: stores,
        },
    });
});

module.exports = {
    getBookStores,
    topRatingStores,
    newBookStores,
    topFreeshipStores,
    getBookStoreById,
    getBookStoresByName,
};

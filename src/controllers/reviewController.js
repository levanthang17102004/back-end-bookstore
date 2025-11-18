const asyncHandler = require('express-async-handler');
const ReviewModel = require('../models/reviewModel');
const BookModel = require('../models/bookModel');

// 📌 API: Thêm hoặc cập nhật đánh giá sách
const reviewBook = asyncHandler(async (req, res) => {
    const { book, rating, comment } = req.body;

    if (!book || !rating) {
        return res.status(400).json({ message: 'Missing required fields: book or rating' });
    }

    const userId = req.user.id;

    // Kiểm tra xem người dùng đã đánh giá sách này chưa
    const existingReview = await ReviewModel.findOne({ user: userId, book });

    if (existingReview) {
        // Nếu có rồi thì cập nhật đánh giá
        existingReview.rating = rating;
        if (comment) existingReview.comment = comment;
        await existingReview.save();

        return res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: existingReview,
        });
    } else {
        // Nếu chưa có thì tạo mới
        const newReview = new ReviewModel({
            user: userId,
            book,
            rating,
            comment,
        });
        await newReview.save();

        return res.status(201).json({
            success: true,
            message: 'Book reviewed successfully',
            data: newReview,
        });
    }
});

// 📌 API: Lấy danh sách đánh giá cho một sách
const getBookReviews = asyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const { current = 1, pageSize = 10 } = req.query;

    const reviews = await ReviewModel.find({ book: bookId })
        .populate('user', 'name email') // Lấy thông tin người đánh giá
        .skip((current - 1) * pageSize)
        .limit(Number(pageSize))
        .sort({ createdAt: -1 });

    const total = await ReviewModel.countDocuments({ book: bookId });

    res.status(200).json({
        success: true,
        message: 'Book reviews retrieved successfully',
        data: reviews,
        pagination: {
            current: Number(current),
            pageSize: Number(pageSize),
            total,
        },
    });
});

// 📌 API: Xóa đánh giá của chính người dùng
const deleteReview = asyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.id;

    const review = await ReviewModel.findOneAndDelete({ user: userId, book: bookId });

    if (!review) {
        return res.status(404).json({ message: 'No review found to delete' });
    }

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
});

module.exports = { reviewBook, getBookReviews, deleteReview };

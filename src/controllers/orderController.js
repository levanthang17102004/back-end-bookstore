const Order = require('../models/orderModel');
const Book = require('../models/bookModel');
const asyncHandler = require('express-async-handler');

/**
 * 🛒 API: Đặt mua sách
 * - Người dùng gửi danh sách sách cần mua + tổng giá + chi tiết đơn hàng
 */
const placeAnOrder = asyncHandler(async (req, res) => {
    const { books, totalPrice, totalQuantity, detail } = req.body;
    const userId = req.user.id; // lấy userId từ token

    // Kiểm tra dữ liệu đầu vào
    if (!books || !Array.isArray(books) || books.length === 0) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Danh sách sách không hợp lệ hoặc rỗng',
            timestamp: Date.now(),
        });
    }

    // Kiểm tra xem sách có tồn tại không
    const existingBooks = await Book.find({ _id: { $in: books } });
    if (existingBooks.length === 0) {
        return res.status(404).json({
            statusCode: 404,
            message: 'Không tìm thấy sách nào hợp lệ',
            timestamp: Date.now(),
        });
    }

    // Tạo đơn hàng mới
    const newOrder = new Order({
        user: userId,
        books,
        totalPrice,
        totalQuantity,
        detail,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
        statusCode: 201,
        message: 'Đơn hàng mua sách đã được tạo thành công',
        data: { _id: savedOrder._id },
        timestamp: Date.now(),
    });
});

/**
 * 📚 API: Lấy tất cả đơn hàng của người dùng
 * - Có phân trang, sắp xếp mới nhất lên đầu
 */
const getAllOrders = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const start = Date.now();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'books',
                select: 'title author image price', // chỉ lấy thông tin cần thiết
            })
            .select('books totalPrice totalQuantity createdAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const end = Date.now();

        res.status(200).json({
            statusCode: 200,
            message: 'Lấy danh sách đơn hàng thành công',
            data: orders,
            pagination: {
                currentPage: page,
                limit,
            },
            duration: `${end - start}ms`,
            timestamp: end,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: 'Lỗi khi lấy danh sách đơn hàng',
            timestamp: Date.now(),
        });
    }
});

module.exports = { placeAnOrder, getAllOrders };

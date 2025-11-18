// middleware/errorMiddleware.js

const errorMiddleHandle = (err, req, res, next) => {
    // Nếu chưa có status code từ trước, mặc định là 500
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        statusCode,
        message: err.message || 'Internal Server Error',
        // Chỉ hiển thị stack khi ở môi trường phát triển
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorMiddleHandle;

// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        // Lấy token từ header Authorization: "Bearer <token>"
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                statusCode: 401,
                message: 'No token provided or invalid format',
            });
        }

        const token = authHeader.split(' ')[1];

        // Xác thực token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Gán thông tin user vào request

        next();
    } catch (error) {
        console.error('❌ Token verification failed:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                statusCode: 401,
                message: 'Token expired, please log in again'
            });
        }

        res.status(403).json({
            statusCode: 403,
            message: 'Invalid token'
        });
    }
};

module.exports = verifyToken;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        // Người đặt hàng
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },

        // Tổng tiền & số lượng sách
        totalPrice: {
            type: Number,
            required: true
        },
        totalQuantity: {
            type: Number,
            required: true
        },

        // Chi tiết từng cuốn sách trong đơn hàng
        detail: [
            {
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'books',
                    required: true
                },
                title: { type: String, required: true },
                author: { type: String },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                image: { type: String },
                category: { type: String },
            },
        ],

        // Trạng thái đơn hàng (mới, đang giao, đã giao, hủy)
        status: {
            type: String,
            enum: ['pending', 'processing', 'delivered', 'cancelled'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('orders', orderSchema);

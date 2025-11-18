const mongoose = require('mongoose');

const bookstoreSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // Tên cửa hàng
        owner: { type: String }, // Chủ cửa hàng
        phone: { type: String }, // Số điện thoại
        address: { type: String }, // Địa chỉ cửa hàng
        email: { type: String }, // Email liên hệ
        description: { type: String }, // Mô tả ngắn về cửa hàng
        rating: { type: Number, default: 0 }, // Đánh giá trung bình
        image: { type: String }, // Ảnh đại diện cửa hàng
        isActive: { type: Boolean, default: true }, // Cửa hàng có đang hoạt động không
    },
    { timestamps: true }
);

module.exports = mongoose.model('bookstores', bookstoreSchema);

/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true, // ✅ sửa require -> required
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        photoUrl: {
            type: String,
            default: 'default-user.png',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: Number,
            default: null,
        },
        verificationExpires: {
            type: Date,
            default: null,
        },
        fcmTokens: {
            type: [String],
            default: [],
        },
        phone: {
            type: String,
            unique: true,
            sparse: true, // ✅ tránh lỗi unique null trùng nhau
        },
        address: {
            type: String,
            default: '',
            trim: true,
        },
    },
    { timestamps: true } // ✅ tự động thêm createdAt & updatedAt
);

// ✅ Tạo model
const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;

const Book = require('../models/bookModel');

// 📘 Lấy danh sách sách theo thể loại
const getBooksByCategory = async (req, res) => {
    try {
        const books = await Book.find({ category: req.params.categoryId });
        res.status(200).json({
            success: true,
            message: 'Books fetched successfully',
            data: books,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};

// 📗 Tạo mới một cuốn sách
const createBook = async (req, res) => {
    try {
        const { title, author, price, description, category, image } = req.body;

        if (!title || !author || !price || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newBook = new Book({
            title,
            author,
            price,
            description,
            category,
            image,
        });

        await newBook.save();

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: newBook,
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating book', error });
    }
};

// 📙 Cập nhật thông tin sách
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
        });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};

// 📕 Xóa sách
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

module.exports = {
    getBooksByCategory,
    createBook,
    updateBook,
    deleteBook,
};

import Book from '../models/Book.js'

class bookService {
  async getBooks() {
    const books = await Book.find();
    return books;
  }

  async getBook(id) {
    const book = await Book.findById(id);
    return book;
  }

  async createBook(bookInfo) {
    const book = await Book.create(bookInfo);
    return book;
  }

  async deleteBook(id) {
    const book = await Book.findByIdAndDelete(id);
    return book;
  }
}

export default new bookService();

import bookService from '../services/bookService.js';

class bookController {
  async getBooks(req, res) {
    try {
      const books = await bookService.getBooks()
      res.json(books)
    } catch (e) {
      res.status(400).json(e.message)
    }
  }

  async getBook(req, res) {
    try {
      const book = await bookService.getBook(req.params.id)
      res.json(book)
    } catch (e) {
      res.status(400).json(e.message)
    }
  }

  async createBook(req, res) {
    try {
      const book = await bookService.createBook(req.body)
      res.json(book)
    } catch (e) {
      res.status(400).json(e.message)
    }
  }

  async deleteBook(req, res) {
    try {
      const book = await bookService.deleteBook(req.params.id)
      res.json(book)
    } catch (e) {
      res.status(400).json(e.message)
    }
  }
}

export default new bookController();

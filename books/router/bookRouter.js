import Router from 'express';
import bookController from '../controllers/bookController.js';

const bookRouter = new Router();

bookRouter.post('/books', bookController.createBook);
bookRouter.get('/books', bookController.getBooks);
bookRouter.get('/books/:id', bookController.getBook);
bookRouter.delete('/books/:id', bookController.deleteBook);

export default bookRouter;

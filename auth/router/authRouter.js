import Router from 'express';
import authController from '../controllers/authController.js';
import { check } from 'express-validator';
import roleMiddleware from '../middleware/roleMiddleware.js';

const authRouter = new Router();

authRouter.post(
  '/registration',
  [
    check('username', 'Поле имя пользователя не может быть пустым.').notEmpty(),
    check(
      'password',
      'Пароль должен быть не менее 4 и не более 10 символов.'
    ).isLength({ min: 4, max: 10 })
  ],
  authController.registration
);
authRouter.post('/login', authController.login);
authRouter.post('/role', authController.createRole);
authRouter.get('/users', roleMiddleware(['Admin']), authController.getUsers);

export default authRouter;

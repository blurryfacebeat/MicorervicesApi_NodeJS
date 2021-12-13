import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

export default (roles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res
          .status(403)
          .json({ message: 'У вас нет доступа к этой команде' });
      }
      const { roles: userRoles } = jwt.verify(token, secret);

      let hasRole = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res
          .status(403)
          .json({ message: 'У вас нет доступа к этой команде' });
      }

      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
  };
};

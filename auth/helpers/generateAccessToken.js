import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  };

  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export default generateAccessToken;

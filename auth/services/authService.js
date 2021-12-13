import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Role from '../models/Role.js';
import generateAccessToken from '../helpers/generateAccessToken.js';
import { validationResult } from 'express-validator';

class authService {
  async registration(regInfo) {
    const errors = validationResult(regInfo).errors;
    if (errors.length) {
      throw new Error(errors[0].msg);
    }

    const { username, password } = regInfo.body;

    const createdUser = await User.findOne({ username });
    if (createdUser) {
      throw new Error('Пользователь с таким именем уже существует.');
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: 'User' });
    const accInfo = await User.create({
      username,
      password: hashPassword,
      roles: [userRole.value]
    });
    return accInfo;
  }

  async login(loginInfo) {
    const { username, password } = loginInfo.body;

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      throw new Error('Пользователь с таким именем не найден');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Введен неверный пароль');
    }

    const token = generateAccessToken(user._id, user.roles);
    return token;
  }

  async getUsers() {
    const users = await User.find();
    return users;
  }

  async createRole(roleInfo) {
    const role = await Role.create(roleInfo);
    return role;
  }
}

export default new authService();

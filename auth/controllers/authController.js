import authService from '../services/authService.js';

class authController {
  async registration(req, res) {
    try {
      const accInfo = await authService.registration(req);
      res.json(accInfo);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  async login(req, res) {
    try {
      const token = await authService.login(req);
      res.json({ token });
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await authService.getUsers();
      res.json(users);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  async createRole(req, res) {
    try {
      const role = await authService.createRole(req.body);
      res.json(role);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }
}

export default new authController();

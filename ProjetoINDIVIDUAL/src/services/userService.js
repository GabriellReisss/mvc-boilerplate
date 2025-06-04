// services/userService.js

const User = require('../models/userModel');

// Use o modelo User ao invés de acessar o pool diretamente
class UserService {
  static async getAllUsers() {
    return await User.getAll();
  }

  static async getUserById(id) {
    return await User.getById(id);
  }

  static async createUser(userData) {
    return await User.create(userData);
  }

  static async updateUser(id, userData) {
    return await User.update(id, userData);
  }

  static async deleteUser(id) {
    return await User.delete(id);
  }
}

module.exports = UserService;

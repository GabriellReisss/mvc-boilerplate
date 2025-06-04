const pool = require('../config/db');

class User {
  static async getAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return result.rows[0];
  }

  static async getByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async create(data) {
    // Verificar se o usuário já existe pelo email
    const existingUser = await this.getByEmail(data.email);
    if (existingUser) {
      return existingUser;
    }
    
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [data.name, data.email]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE user_id = $3 RETURNING *',
      [data.name, data.email, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = User;
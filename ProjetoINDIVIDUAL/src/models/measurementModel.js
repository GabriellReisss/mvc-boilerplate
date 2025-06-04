const pool = require('../config/db');

class Measurement {
  static async addHeight(userId, value) {
    const query = 'INSERT INTO height (user_id, value) VALUES ($1, $2) RETURNING *';
    const values = [userId, value];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async addWeight(userId, value) {
    const query = 'INSERT INTO weight (user_id, value) VALUES ($1, $2) RETURNING *';
    const values = [userId, value];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async calculateBMI(heightId, weightId) {
    // Primeiro buscar os valores de altura e peso
    const heightQuery = 'SELECT value FROM height WHERE height_id = $1';
    const weightQuery = 'SELECT value FROM weight WHERE weight_id = $1';
    
    try {
      const heightResult = await pool.query(heightQuery, [heightId]);
      const weightResult = await pool.query(weightQuery, [weightId]);
      
      if (heightResult.rows.length === 0 || weightResult.rows.length === 0) {
        throw new Error('Altura ou peso não encontrados');
      }
      
      const height = heightResult.rows[0].value; // em metros
      const weight = weightResult.rows[0].value; // em kg
      
      // Cálculo do IMC: peso / (altura^2)
      const bmiValue = weight / (height * height);
      
      // Salvando o resultado do IMC
      const saveBmiQuery = 'INSERT INTO bmi (height_id, weight_id, value) VALUES ($1, $2, $3) RETURNING *';
      const bmiResult = await pool.query(saveBmiQuery, [heightId, weightId, bmiValue]);
      
      return bmiResult.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getUserHistory(userId) {
    const query = `
      SELECT 
        b.bmi_id, b.value as bmi_value, b.measure_date,
        h.value as height, w.value as weight
      FROM bmi b
      JOIN height h ON b.height_id = h.height_id
      JOIN weight w ON b.weight_id = w.weight_id
      WHERE h.user_id = $1
      ORDER BY b.measure_date DESC
    `;
    
    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Measurement;
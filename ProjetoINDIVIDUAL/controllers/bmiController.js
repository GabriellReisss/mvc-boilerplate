const User = require('../models/userModel');
const Measurement = require('../models/measurementModel');

exports.calculateBMI = async (req, res) => {
  try {
    const { name, email, height, weight } = req.body;
    
    if (!name || !email || !height || !weight) {
      return res.status(400).json({ 
        message: 'Nome, email, altura e peso são obrigatórios' 
      });
    }
    
    // Criar ou buscar usuário
    const user = await User.create({ name, email });
    
    // Adicionar altura e peso
    const heightRecord = await Measurement.addHeight(user.user_id, height);
    const weightRecord = await Measurement.addWeight(user.user_id, weight);
    
    // Calcular IMC
    const bmi = await Measurement.calculateBMI(
      heightRecord.height_id, 
      weightRecord.weight_id
    );
    
    res.status(201).json({
      user,
      height: heightRecord,
      weight: weightRecord,
      bmi
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const history = await Measurement.getUserHistory(userId);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rota de página para mostrar o formulário de IMC
exports.showCalculator = (req, res) => {
  res.render('calculator');
};

// Rota de página para mostrar o histórico
exports.showHistory = async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.render('history', { history: [] });
    }
    
    const history = await Measurement.getUserHistory(userId);
    const user = await User.getById(userId);
    
    res.render('history', { 
      history, 
      user,
      getBMIClassification: (bmi) => {
        if (bmi < 18.5) return 'Abaixo do peso';
        if (bmi < 25) return 'Peso normal';
        if (bmi < 30) return 'Sobrepeso';
        if (bmi < 35) return 'Obesidade Grau I';
        if (bmi < 40) return 'Obesidade Grau II';
        return 'Obesidade Grau III';
      }
    });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
};
const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');

// Rota para a página inicial - renderiza diretamente calculator.ejs
router.get('/', (req, res) => {
  res.render('calculator');
});

// Rotas para visualização
router.get('/bmi', bmiController.showCalculator);
router.get('/history', bmiController.showHistory);

module.exports = router;

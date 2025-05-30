const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');

// Rotas da API para IMC
router.post('/calculate', bmiController.calculateBMI);
router.get('/history/:userId', bmiController.getUserHistory);

module.exports = router;
// routes/index.js
const express = require('express');
const router = express.Router();

// Importando rotas
const userRoutes = require('./userRoutes');
const frontRoutes = require('./frontRoutes');
const bmiRoutes = require('./bmiRoutes');

// API routes
router.use('/api/users', userRoutes);
router.use('/api/bmi', bmiRoutes);

// Frontend routes
router.use('/', frontRoutes);

module.exports = router;
// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET /login
router.get('/login', authController.getLoginPage);

// POST /login
router.post('/login', authController.postLogin);

module.exports = router;

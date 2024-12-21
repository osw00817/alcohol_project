// routes/apiRoutes.js

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// POST /api/report - 리포트 추가
router.post('/report', apiController.createReport);

module.exports = router;

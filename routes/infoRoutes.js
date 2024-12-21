// routes/infoRoutes.js

const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const { verifyToken } = require('../middlewares/authMiddleware');

// /info (GET) -> info.ejs 페이지 렌더
router.get('/', verifyToken, infoController.getInfoPage);

// /info/reports/:device_id/:measurement_date (GET) -> 특정 디바이스와 날짜의 리포트 목록
router.get('/reports/:device_id/:measurement_date', verifyToken, infoController.getReportsByDeviceAndDate);

// /info/reportDetail/:reportId (GET) -> 특정 리포트의 상세 정보
router.get('/reportDetail/:reportId', verifyToken, infoController.getReportDetail);

module.exports = router;

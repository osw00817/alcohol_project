// server.js
require('dotenv').config(); // .env 파일 사용
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./models'); // models/index.js
const authRoutes = require('./routes/authRoutes');
const infoRoutes = require('./routes/infoRoutes');
const apiRoutes = require('./routes/apiRoutes'); // 새로 추가된 라우트

const app = express();
const PORT = process.env.PORT || 3000;

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 라우터 등록
app.use('/', authRoutes);
app.use('/info', infoRoutes);
app.use('/api', apiRoutes); // /api 엔드포인트 등록

// DB 연결 및 서버 시작
db.sequelize.sync()
  .then(() => {
    console.log('DB connected and synced');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

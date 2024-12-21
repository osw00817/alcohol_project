// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.jwt; // 쿠키 사용 시

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; // 토큰에 들어있는 유저 정보
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

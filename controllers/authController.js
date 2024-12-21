// controllers/authController.js

const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getLoginPage = (req, res) => {
  res.render('login'); 
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).send('Invalid username');
    }

    // 비밀번호 확인
    console.log('입력된 비밀번호:', password);
    console.log('저장된 해시된 비밀번호:', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { // 수정된 조건
      return res.status(401).send('Invalid password');
    }

    // JWT 토큰 생성
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // 쿠키에 저장 (httpOnly 옵션)
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1시간
    return res.redirect('/info'); 
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

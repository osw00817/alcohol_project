// controllers/apiController.js

const db = require('../models');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
require('dotenv').config(); // dotenv를 상단에 추가하여 환경변수 사용

exports.createReport = async (req, res) => {
  const { device_id, device_name, location, person_id, alcohol_level } = req.body;
  console.log(device_id,device_name,location,person_id,alcohol_level);
  // 필수 필드 확인
  // {'device_id': 'DEV001', 'device_name': '안씻는 컴붕이1', 'location': '제 6공학관', 'alcohol_level': 0, 'person_id': 1}
  if (!device_id || !device_name || !location || person_id || alcohol_level === undefined) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // 트랜잭션 시작
  const t = await db.sequelize.transaction();

  try {
    // 1. Device 테이블 확인 및 추가
    let device = await db.Device.findOne({
      where: {
        device_id,
        device_name
      },
      transaction: t
    });

    const currentDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    if (!device) {
      // Device가 없으면 추가
      device = await db.Device.create({
        device_id,
        device_name,
        location,
        measurement_date: currentDate
      }, { transaction: t });
    } else {
      // Device가 있으면 measurement_date 업데이트
      await db.Device.update(
        { measurement_date: currentDate },
        { where: { id: device.id }, transaction: t }
      );
    }

    // 2. People 테이블 확인
    const person = await db.People.findOne({
      where: { person_id },
      transaction: t
    });

    if (!person) {
      throw new Error('Person not found.');
    }

    // 3. Report 테이블에 추가
    const report = await db.Report.create({
      alcohol_level,
      measurement_date: currentDate,
      device_id,
      location,
      name: person.name,
      person_id
    }, { transaction: t });

    // 4. alcohol_level이 0.08 이상
    if (alcohol_level >= 0.08) {
      await db.Penalty.create({
        person_id,
        name: person.name,
        penalty_date: currentDate,
        penalty_info: '면허 취소',
        reason: '혈중알코올농도 0.08이상',
        device_id
      }, { transaction: t });

      // 이메일 전송 함수
      async function sendEmail(recipientEmail, personName, alcoholLevel) {
        try {
          const today = new Date().toLocaleDateString('ko-KR'); // 'YYYY-MM-DD' 형식으로 변경
          
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER, // .env 파일에 설정된 이메일
              pass: process.env.EMAIL_PASS, // .env 파일에 설정된 비밀번호
            },
          });

          // 이메일 내용 설정
          const mailOptions = {
            from: process.env.EMAIL_USER, // 발신자 이메일
            to: recipientEmail, // 수신자 이메일 (phone_number에서 가져옴)
            subject: '[중요] 음주측정 결과 및 처벌 고지 안내', // 이메일 제목
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="color: #d9534f;">[음주측정 결과 및 처벌 고지]</h1>
                <p>안녕하세요, ${personName}님</p>
                <p>귀하께서 <strong>음주측정</strong>을 통해 적발된 사항에 대한 처벌 고지를 안내드립니다.</p>
                <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;" />
                <p><strong>측정 일시:</strong> ${today}<br />
                <strong>측정 결과:</strong> 혈중알코올농도 ${alcoholLevel}</p>
                <p>
                  위 측정 결과는 관련 법규에 따라 처벌 대상에 해당하며, 이에 따라 다음과 같은 조치가 이루어질 예정입니다.
                </p>
                <ul style="padding-left: 20px;">
                  <li>벌금 부과: 1000만원</li>
                  <li>운전면허 취소</li>
                </ul>
                <p>추가적인 문의사항이 있거나 이의 제기를 원하시는 경우, <strong>담당 부서</strong>로 연락 주시기 바랍니다.</p>
                <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;" />
                <p>
                  <strong>담당 부서:</strong> 음주단속팀<br />
                  <strong>연락처:</strong> 02-123-4567<br />
                  <strong>이메일:</strong> pnutest0721@gmail.com
                </p>
                <p>감사합니다.</p>
                <p style="color: #999; font-size: 0.9em;">본 이메일은 자동 발송된 것으로, 회신이 불가합니다.</p>
              </div>
            `,
          };

          // 이메일 보내기
          const info = await transporter.sendMail(mailOptions);
          console.log('이메일 전송 성공:', info.response);
        } catch (error) {
          console.error('이메일 전송 실패:', error);
        }
      }

      const recipientEmail = person.phone_number; // 수정된 부분: phone_number를 이메일로 사용

      // 이메일 전송 호출
      sendEmail(recipientEmail, person.name, alcohol_level);
    } else if(alcohol_level >= 0.03){

      await db.Penalty.create({
        person_id,
        name: person.name,
        penalty_date: currentDate,
        penalty_info: '면허 정지',
        reason: '혈중알코올농도 0.03이상',
        device_id
      }, { transaction: t });

      // 이메일 전송 함수
      async function sendEmail(recipientEmail, personName, alcoholLevel) {
        try {
          const today = new Date().toLocaleDateString('ko-KR'); // 'YYYY-MM-DD' 형식으로 변경
          
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER, // .env 파일에 설정된 이메일
              pass: process.env.EMAIL_PASS, // .env 파일에 설정된 비밀번호
            },
          });

          // 이메일 내용 설정
          const mailOptions = {
            from: process.env.EMAIL_USER, // 발신자 이메일
            to: recipientEmail, // 수신자 이메일 (phone_number에서 가져옴)
            subject: '[중요] 음주측정 결과 및 처벌 고지 안내', // 이메일 제목
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="color: #d9534f;">[음주측정 결과 및 처벌 고지]</h1>
                <p>안녕하세요, ${personName}님</p>
                <p>귀하께서 <strong>음주측정</strong>을 통해 적발된 사항에 대한 처벌 고지를 안내드립니다.</p>
                <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;" />
                <p><strong>측정 일시:</strong> ${today}<br />
                <strong>측정 결과:</strong> 혈중알코올농도 ${alcoholLevel}</p>
                <p>
                  위 측정 결과는 관련 법규에 따라 처벌 대상에 해당하며, 이에 따라 다음과 같은 조치가 이루어질 예정입니다.
                </p>
                <ul style="padding-left: 20px;">
                  <li>벌금 부과: 500만원</li>
                  <li>운전면허 정지</li>
                </ul>
                <p>추가적인 문의사항이 있거나 이의 제기를 원하시는 경우, <strong>담당 부서</strong>로 연락 주시기 바랍니다.</p>
                <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;" />
                <p>
                  <strong>담당 부서:</strong> 음주단속팀<br />
                  <strong>연락처:</strong> 02-123-4567<br />
                  <strong>이메일:</strong> pnutest0721@gmail.com
                </p>
                <p>감사합니다.</p>
                <p style="color: #999; font-size: 0.9em;">본 이메일은 자동 발송된 것으로, 회신이 불가합니다.</p>
              </div>
            `,
          };

          // 이메일 보내기
          const info = await transporter.sendMail(mailOptions);
          console.log('이메일 전송 성공:', info.response);
        } catch (error) {
          console.error('이메일 전송 실패:', error);
        }
      }

      const recipientEmail = person.phone_number; // 수정된 부분: phone_number를 이메일로 사용

      // 이메일 전송 호출
      sendEmail(recipientEmail, person.name, alcohol_level);
    }

    // 트랜잭션 커밋
    await t.commit();
    return res.status(201).json({ message: 'Report created successfully.', report });
  } catch (error) {
    // 트랜잭션 롤백
    await t.rollback();
    console.error('Error creating report:', error);
    return res.status(500).json({ error: 'Server error.' });
  }
};

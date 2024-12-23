const nodemailer = require('nodemailer');

// 이메일 전송 함수
async function sendEmail() {
  try {
    require('dotenv').config();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 이메일 내용 설정
    const mailOptions    = {
        from: 'pnutest0721@gmail.com', // 발신자 이메일
        to: 'osw00817@naver.com', // 수신자 이메일
        subject: '[중요] 음주측정 결과 및 처벌 고지 안내', // 이메일 제목
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="color: #d9534f;">[음주측정 결과 및 처벌 고지]</h1>
            <p>안녕하세요,</p>
            <p>귀하께서 <strong>음주측정</strong>을 통해 적발된 사항에 대한 처벌 고지를 안내드립니다.</p>
            <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;" />
            <p><strong>측정 일시:</strong> YYYY-MM-DD HH:MM<br />
            <strong>측정 결과:</strong> 혈중알코올농도 XX%</p>
            <p>
              위 측정 결과는 관련 법규에 따라 처벌 대상에 해당하며, 이에 따라 다음과 같은 조치가 이루어질 예정입니다.
            </p>
            <ul style="padding-left: 20px;">
              <li>벌금 부과</li>
              <li>운전면허 정지/취소</li>
              <li>기타 행정조치</li>
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

// 함수 호출
sendEmail();

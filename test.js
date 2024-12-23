const db = require('./models'); // models/index.js

const seed = async () => {
  try {
    // 데이터베이스 동기화 (테이블을 강제로 초기화)
    await db.sequelize.sync({ force: true }); // 테스트 시 테이블 초기화

    // 사용자 데이터 삽입
    const users = [
      { username: 'admin', password: 'admin1234' },
      { username: 'user2', password: 'password2' },
      { username: 'user3', password: 'password3' },
    ];

    for (const userData of users) {
      await db.User.create(userData);
      console.log(`사용자 생성 완료: ${userData.username}`);
    }

    // 디바이스 데이터 삽입
    const devices = [
      { device_id: 'DEV002', device_name: '서울1', location: '서울특별시 강남구 테헤란로 123', measurement_date: '2024-01-01' },
      { device_id: 'DEV003', device_name: '부산1', location: '부산광역시 해운대구 해운대해변로 456', measurement_date: '2024-02-15' },
      { device_id: 'DEV004', device_name: '대구1', location: '대구광역시 중구 중앙대로 789', measurement_date: '2024-03-10' },
    ];

    for (const deviceData of devices) {
      await db.Device.create(deviceData);
      console.log(`장치 생성 완료: ${deviceData.device_name}`);
    }

    // 사람 데이터 삽입
    const people = [
      { person_id: '1', name: '정진재', address: '울산광역시 중구 신기13길길', phone_number: 'osw00817@naver.com', etc: '기타 정보', resident_id: '050000-3456789' },
      { person_id: '2', name: '김지민', address: '양산시 신주로 69', phone_number: 'osw00817@naver.com', etc: '기타 정보', resident_id: '040000-3456789' },
      { person_id: '3', name: '박지훈', address: '부산광역시 사하구 다대포로 789', phone_number: 'osw00817@naver.com', etc: '기타 정보', resident_id: '920303-3456789' },
      { person_id: '4', name: '오승원', address: '김해시 삼게동 해반천로', phone_number: 'osw00817@naver.com', etc: '기타 정보', resident_id: '050817-3456789' },
    ];

    for (const personData of people) {
      await db.People.create(personData);
      console.log(`사람 생성 완료: ${personData.name}`);
    }

    // 리포트 데이터 삽입
    /*
    0.03 면허정지
    0.08 면허취소
    */

    const reports = [
      { alcohol_level: 0.04, measurement_date: '2024-03-10', device_id: 'DEV004', location: '대구광역시 중구 중앙대로 789', name: '김지민', person_id: '2' },
      { alcohol_level: 0.08, measurement_date: '2024-01-01', device_id: 'DEV002', location: '서울특별시 강남구 테헤란로 123', name: '김지민', person_id: '2' },
      { alcohol_level: 0.02, measurement_date: '2024-03-10', device_id: 'DEV004', location: '부산광역시 해운대구 해운대해변로 456', name: '박지훈', person_id: '3' },
      // 추가 리포트
      { alcohol_level: 0.09, measurement_date: '2024-01-01', device_id: 'DEV002', location: '서울특별시 강남구 테헤란로 123', name: '정진재', person_id: '1' },
    ];

    for (const reportData of reports) {
      await db.Report.create(reportData);
      console.log(`리포트 생성 완료: ${reportData.name} (${reportData.measurement_date})`);
    }

    // 패널티 데이터 삽입
    const penalties = [
      { person_id: '1', name: '정진재', penalty_date: '2024-02-15', penalty_info: '면허 취소', reason: '혈중알코올농도 0.08이상', device_id: 'DEV002' },
      { person_id: '2', name: '김지민', penalty_date: '2024-03-10', penalty_info: '면허 정지', reason: '혈중알코올농도 0.03이상', device_id: 'DEV004' },
      { person_id: '2', name: '김지민', penalty_date: '2024-02-15', penalty_info: '면허 취소', reason: '혈중알코올농도 0.08이상', device_id: 'DEV002' },
    ];

    for (const penaltyData of penalties) {
      await db.Penalty.create(penaltyData);
      console.log(`패널티 생성 완료: ${penaltyData.name} (${penaltyData.penalty_date})`);
    }

    console.log('데이터 삽입 완료.');
    process.exit();
  } catch (error) {
    console.error('데이터 삽입 오류:', error);
    process.exit(1);
  }
};

seed();
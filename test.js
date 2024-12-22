const db = require('./models'); // models/index.js

const seed = async () => {
  try {
    // 데이터베이스 동기화 (테이블을 강제로 초기화)
    await db.sequelize.sync({ force: true }); // 테스트 시 테이블 초기화

    // 사용자 데이터 삽입
    const users = [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
      { username: 'user3', password: 'password3' },
    ];

    for (const userData of users) {
      await db.User.create(userData);
      console.log(`사용자 생성 완료: ${userData.username}`);
    }

    // 디바이스 데이터 삽입
    const devices = [
      { device_id: 'DEV001', device_name: '장치 A', location: '서울특별시 강남구 테헤란로 123', measurement_date: '2024-01-01' },
      { device_id: 'DEV002', device_name: '장치 B', location: '부산광역시 해운대구 해운대해변로 456', measurement_date: '2024-02-15' },
      { device_id: 'DEV003', device_name: '장치 C', location: '대구광역시 중구 중앙대로 789', measurement_date: '2024-03-10' },
    ];

    for (const deviceData of devices) {
      await db.Device.create(deviceData);
      console.log(`장치 생성 완료: ${deviceData.device_name}`);
    }

    // 사람 데이터 삽입
    const people = [
      { person_id: 'P001', name: '김민준', address: '서울특별시 송파구 올림픽로 1234', phone_number: '010-1234-5678', etc: '기타 정보', resident_id: '900101-1234567' },
      { person_id: 'P002', name: '이서윤', address: '경기도 성남시 분당구 수내로 567', phone_number: '010-9876-5432', etc: '기타 정보', resident_id: '910202-2345678' },
      { person_id: 'P003', name: '박지훈', address: '부산광역시 사하구 다대포로 789', phone_number: '010-5678-1234', etc: '기타 정보', resident_id: '920303-3456789' },
    ];

    for (const personData of people) {
      await db.People.create(personData);
      console.log(`사람 생성 완료: ${personData.name}`);
    }

    // 리포트 데이터 삽입
    const reports = [
      { alcohol_level: 0.05, measurement_date: '2024-01-01', device_id: 'DEV001', location: '서울특별시 강남구 테헤란로 123', name: '김민준', person_id: 'P001' },
      { alcohol_level: 0.08, measurement_date: '2024-02-15', device_id: 'DEV002', location: '부산광역시 해운대구 해운대해변로 456', name: '이서윤', person_id: 'P002' },
      { alcohol_level: 0.02, measurement_date: '2024-03-10', device_id: 'DEV003', location: '대구광역시 중구 중앙대로 789', name: '박지훈', person_id: 'P003' },
      // 추가 리포트
      { alcohol_level: 0.07, measurement_date: '2024-01-01', device_id: 'DEV001', location: '서울특별시 강남구 테헤란로 123', name: '이서윤', person_id: 'P002' },
      { alcohol_level: 0.03, measurement_date: '2024-02-15', device_id: 'DEV002', location: '부산광역시 해운대구 해운대해변로 456', name: '박지훈', person_id: 'P003' },
      { alcohol_level: 0.06, measurement_date: '2024-03-10', device_id: 'DEV003', location: '대구광역시 중구 중앙대로 789', name: '김민준', person_id: 'P001' },
    ];

    for (const reportData of reports) {
      await db.Report.create(reportData);
      console.log(`리포트 생성 완료: ${reportData.name} (${reportData.measurement_date})`);
    }

    // 패널티 데이터 삽입
    const penalties = [
      { person_id: 'P001', name: '김민준', penalty_date: '2024-01-05', penalty_info: '과속', reason: '제한속도 초과', device_id: 'DEV001' },
      { person_id: 'P002', name: '이서윤', penalty_date: '2024-02-20', penalty_info: '신호위반', reason: '교차로 적색 신호 위반', device_id: 'DEV002' },
      { person_id: 'P003', name: '박지훈', penalty_date: '2024-03-15', penalty_info: '불법주차', reason: '주정차 금지구역 위반', device_id: 'DEV003' },
      // 추가 패널티
      { person_id: 'P001', name: '김민준', penalty_date: '2024-04-01', penalty_info: '음주운전', reason: '혈중알코올농도 초과', device_id: 'DEV001' },
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
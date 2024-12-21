// seed.js

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
      console.log(`Created user: ${userData.username}`);
    }

    // 디바이스 데이터 삽입
    const devices = [
      { device_id: 'DEV001', device_name: 'Device A', location: 'Location 1', measurement_date: '2024-01-01' },
      { device_id: 'DEV002', device_name: 'Device B', location: 'Location 2', measurement_date: '2024-02-15' },
      { device_id: 'DEV003', device_name: 'Device C', location: 'Location 3', measurement_date: '2024-03-10' },
    ];

    for (const deviceData of devices) {
      await db.Device.create(deviceData);
      console.log(`Created device: ${deviceData.device_name}`);
    }

    // 사람 데이터 삽입
    const people = [
      { person_id: 'P001', name: 'Alice', address: '123 Main St', phone_number: '555-1234', etc: 'Some info' },
      { person_id: 'P002', name: 'Bob', address: '456 Elm St', phone_number: '555-5678', etc: 'Other info' },
      { person_id: 'P003', name: 'Charlie', address: '789 Oak St', phone_number: '555-9012', etc: 'More info' },
    ];

    for (const personData of people) {
      await db.People.create(personData);
      console.log(`Created person: ${personData.name}`);
    }

    // 리포트 데이터 삽입
    const reports = [
      { alcohol_level: 0.05, measurement_date: '2024-01-01', device_id: 'DEV001', location: 'Location 1', name: 'Alice', person_id: 'P001' },
      { alcohol_level: 0.08, measurement_date: '2024-02-15', device_id: 'DEV002', location: 'Location 2', name: 'Bob', person_id: 'P002' },
      { alcohol_level: 0.02, measurement_date: '2024-03-10', device_id: 'DEV003', location: 'Location 3', name: 'Charlie', person_id: 'P003' },
      // 추가 리포트
      { alcohol_level: 0.07, measurement_date: '2024-01-01', device_id: 'DEV001', location: 'Location 1', name: 'Bob', person_id: 'P002' },
      { alcohol_level: 0.03, measurement_date: '2024-02-15', device_id: 'DEV002', location: 'Location 2', name: 'Charlie', person_id: 'P003' },
      { alcohol_level: 0.06, measurement_date: '2024-03-10', device_id: 'DEV003', location: 'Location 3', name: 'Alice', person_id: 'P001' },
    ];

    for (const reportData of reports) {
      await db.Report.create(reportData);
      console.log(`Created report for ${reportData.name} on: ${reportData.measurement_date}`);
    }

    // 패널티 데이터 삽입
    const penalties = [
      { person_id: 'P001', name: 'Alice', penalty_date: '2024-01-05', penalty_info: 'Speeding', reason: 'Over speed', device_id: 'DEV001' },
      { person_id: 'P002', name: 'Bob', penalty_date: '2024-02-20', penalty_info: 'No seatbelt', reason: 'No seatbelt', device_id: 'DEV002' },
      { person_id: 'P003', name: 'Charlie', penalty_date: '2024-03-15', penalty_info: 'Illegal parking', reason: 'Illegal parking', device_id: 'DEV003' },
      // 추가 패널티
      { person_id: 'P001', name: 'Alice', penalty_date: '2024-04-01', penalty_info: 'Speeding', reason: 'Over speed', device_id: 'DEV001' },
    ];

    for (const penaltyData of penalties) {
      await db.Penalty.create(penaltyData);
      console.log(`Created penalty for ${penaltyData.name} on: ${penaltyData.penalty_date}`);
    }

    console.log('Seeding completed.');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();

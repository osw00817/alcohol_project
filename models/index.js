// models/index.js
const { Sequelize } = require('sequelize');
const DeviceModel = require('./Device');
const PeopleModel = require('./People');
const PenaltyModel = require('./Penalty');
const ReportModel = require('./Report');
const UserModel = require('./User');

// 환경 변수 사용
const sequelize = new Sequelize(
  process.env.DB_NAME || 'adventure',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '1234',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // 옵션: 로깅 비활성화
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 모델 초기화
db.Device = DeviceModel(sequelize, Sequelize);
db.People = PeopleModel(sequelize, Sequelize);
db.Penalty = PenaltyModel(sequelize, Sequelize);
db.Report = ReportModel(sequelize, Sequelize);
db.User = UserModel(sequelize, Sequelize);

// 모델 간 관계 설정
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

// models/Report.js
module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      alcohol_level: { // 철자 수정
        type: DataTypes.FLOAT,
        allowNull: false
      },
      measurement_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      device_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: { // 사람 이름
        type: DataTypes.STRING,
        allowNull: false
      },
      person_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'reports',
      timestamps: false
    });
  
    Report.associate = function(models) {
      Report.belongsTo(models.People, { foreignKey: 'person_id', targetKey: 'person_id', as: 'Person' });
      Report.belongsTo(models.Device, { foreignKey: 'device_id', targetKey: 'device_id', as: 'Device' });
    };
  
    return Report;
  };
  
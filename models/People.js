// models/People.js
module.exports = (sequelize, DataTypes) => {
    const People = sequelize.define('People', {
      person_id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING
      },
      phone_number: {
        type: DataTypes.STRING
      },
      etc: {
        type: DataTypes.STRING // 필요에 따라 데이터 타입 조정
      }
    }, {
      tableName: 'people',
      timestamps: false
    });
  
    People.associate = function(models) {
      People.hasMany(models.Report, { foreignKey: 'person_id', sourceKey: 'person_id' });
      People.hasMany(models.Penalty, { foreignKey: 'person_id', sourceKey: 'person_id' });
    };
  
    return People;
  };
  
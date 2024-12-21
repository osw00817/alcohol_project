// models/Penalty.js
module.exports = (sequelize, DataTypes) => {
    const Penalty = sequelize.define('Penalty', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      person_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      penalty_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      penalty_info: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false
      },
      device_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'penalties',
      timestamps: false
    });
  
    Penalty.associate = function(models) {
      Penalty.belongsTo(models.People, { foreignKey: 'person_id', targetKey: 'person_id' });
      Penalty.belongsTo(models.Device, { foreignKey: 'device_id', targetKey: 'device_id' });
    };
  
    return Penalty;
  };
  
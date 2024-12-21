// models/Device.js
module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      device_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      device_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      measurement_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
      tableName: 'devices',
      timestamps: false
    });
  
    Device.associate = function(models) {
      Device.hasMany(models.Report, { foreignKey: 'device_id', sourceKey: 'device_id' });
      Device.hasMany(models.Penalty, { foreignKey: 'device_id', sourceKey: 'device_id' });
    };
  
    return Device;
  };
  
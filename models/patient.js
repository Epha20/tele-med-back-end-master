("use strict");
const { Model } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      Patient.belongsTo(models.User, { foreignKey: "userID" });
      Patient.hasMany(models.HealthRecord, { foreignKey: "patientID" });
      Patient.hasMany(models.ChatRoom, { foreignKey: "patientID" });

      Patient.hasMany(models.LaboratoryReport,{foreignKey: "patientID"}  );
      
    }
  }
  Patient.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      bloodtype: {
        type: DataTypes.STRING,
       
      },
      userID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      }
       
    },
    {
      sequelize,
      modelName: "Patients",
    }
  );
 
  return Patient;
};

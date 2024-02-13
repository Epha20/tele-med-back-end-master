("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MedicalStaff extends Model {
    static associate(models) {
      MedicalStaff.belongsTo(models.User, { foreignKey: "userID" });
      MedicalStaff.belongsTo(models.HealthCare, { foreignKey: "HealthCareID" });
      MedicalStaff.hasMany(models.HealthRecord, { foreignKey: "medicalStaffID" });
      MedicalStaff.hasMany(models.ChatRoom, { foreignKey: "medicalStaffID" });
      MedicalStaff.hasMany(models.LaboratoryReport, { foreignKey: "medicalStaffID" });
      

    }
  }
  MedicalStaff.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      workExperiance: {
        type: DataTypes.STRING,
       
      },
     
        role:{
        type: DataTypes.STRING,
        allowNull: false,
        },
      
        specialization :{
        type: DataTypes.STRING,
        allowNull: false,
        },
    
        
        educationDegree :{
        type: DataTypes.STRING,
        allowNull: false,
            
        },
        healthcarAdminAUtorization:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        },
        isAuthorizationField:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        },
        FinalAuth:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        },
        fieldsToBeUpdated:{
        type: DataTypes.STRING,
        allowNull: true,
        }
       
    },
    {
      sequelize,
      modelName: "MedicalStaff",
    }
  );
 
  return MedicalStaff;
};

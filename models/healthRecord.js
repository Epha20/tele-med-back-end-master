("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HealthRecord extends Model {
    static associate(models) {
        
        
    }
  }
  HealthRecord.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      patientID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Patients",
          key: "id",
        },
      },
      
        medicalStaffID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "MedicalStaffs",
            key: "id",
        }},
        LaboratoryResultId :{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "LaboratoryReports",
                key: "id",
            }},
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        chatRoomId :{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "ChatRooms",
                key: "id",
            }},
        
         
       

       
    },
    {
      sequelize,
      modelName: "HealthRecord",
    }
  );
 
  return HealthRecord;
};

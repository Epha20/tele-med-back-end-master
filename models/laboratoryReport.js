
("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LaboratoryReport extends Model {
    static associate(models) {
        LaboratoryReport.belongsTo(models.Laboratory, {
            foreignKey: "laboratoryId",
        });
        // LaboratoryReport.belongsTo(models.LaboratoryTest, { 
        //     foreignKey: "laboratoryTestId",
        // });
        // LaboratoryReport.belongsTo(models.Patient, {
        //     foreignKey: "patientId",
        // });
        LaboratoryReport.belongsTo(models.MedicalStaff, {
            foreignKey: "medicalStaffID",
        });
        LaboratoryReport.belongsTo(models.ChatRoom, {
            foreignKey: "chatRoomId",
        });



        
        
    }
  }
  LaboratoryReport.init(
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
        laboratoryRequestId:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "LaboratoryTestRquests",
                key: "id",
            }},
        laboratoryTest:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "LaboratoryTests",
                key: "id",
            }},
        chatRoomId :{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "ChatRooms",
                key: "id",
            }},
        laboratoryId:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Laboratories",  
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
        time:{
            type: DataTypes.TIME,
            allowNull: false,
               },
    


       
    },
    {
      sequelize,
      modelName: "LaboratoryReport",
    }
  );
 
  return LaboratoryReport;
};

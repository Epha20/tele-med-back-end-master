("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    static associate(models) {
        // ChatRoom.belongsTo(models.MedicalStaff, { foreignKey: "medicalStaffID" });
        // ChatRoom.belongsTo(models.Patient, { foreignKey: "patientID" });
        
        // ChatRoom.belongsTo(models.Patient, { foreignKey: "patientID" });
        
        
    }
  }
  ChatRoom.init(
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
        }}

       
    },
    {
      sequelize,
      modelName: "ChatRoom",
    }
  );
 
  return ChatRoom;
};

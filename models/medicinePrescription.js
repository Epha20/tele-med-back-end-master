("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MedicinePrescription extends Model {
    static associate(models) {
        MedicinePrescription.belongsTo(models.MedicalStaff, { foreignKey: "senderID" });
        MedicinePrescription.belongsTo(models.Medicine, { foreignKey: "medicineId" });
    }
  }
  MedicinePrescription.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
        senderID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "MedicalStaffs",
            key: "id",
        },
        },
        medicineId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Medicines",
            key: "id",
        },
        },
        text: {
        type: DataTypes.STRING,
         allowNull: false,
        },
        chatRoomID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "ChatRooms",
            key: "id",
        }},
        type:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        medicineName:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        medicineDosage:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        medicineFrequency:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        medicineDuration:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        medicineQuantity:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        medicineRefill:{
        type: DataTypes.STRING,
        allowNull: true,
        },
        medicineNotes:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        medicinePrescriptionDate:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        medicinePrescriptionTime:{
        type: DataTypes.STRING,
        allowNull: true,
        },
        medicinePrescriptionExpirationDate:{
        type: DataTypes.STRING,
        allowNull: true,
        },
        medicinePrescriptionExpirationTime:{
        type: DataTypes.STRING,
        allowNull: true,
        },

        
    },


 
       
 
    {
      sequelize,
      modelName: "MedicinePrescription",
    }
  );
 
  return MedicinePrescription;
};

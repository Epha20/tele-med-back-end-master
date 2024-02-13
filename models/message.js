("use strict");
const { Model } = require("sequelize");
const medicinePrescription = require("./medicinePrescription");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
        Message.belongsTo(models.ChatRoom, { foreignKey: "chatRoomID" });
        Message.belongsTo(models.User, { foreignKey: "senderID" });
    }
  }
  Message.init(
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
          model: "Users",
          key: "id",
        },
      },
      text: {
        type: DataTypes.STRING,
       
      },
     
        type:{
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
        image:{
        type: DataTypes.STRING,
        allowNull: true,
        },
        medicinePrescriptionId:{
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "MedicinePrescriptions",
            key: "id",
        }},
        laboratoryRequestId:{
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "LaboratoryRequests",
            key: "id",
        }},
        laboratoryResultId:{
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "LaboratoryReports",
            key: "id",
        }},
        
        appointmentId:{
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "Appointments",
            key: "id",
        }},
        

 
       
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
 
  return Message;
};

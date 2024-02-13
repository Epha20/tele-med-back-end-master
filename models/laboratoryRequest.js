("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LaboratoryRequest extends Model {
    static associate(models) {
        LaboratoryRequest.belongsTo(models.ChatRoom, { foreignKey: "chatRoomID" });
        LaboratoryRequest.belongsTo(models.User, { foreignKey: "senderID" });
    }
  }
  LaboratoryRequest.init(
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
            model: "Medicalstaffs",
            key: "id",
        },
        descriptionText:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        },
        chatRoomID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "ChatRooms",
            key: "id",
        }},
 
       
    },
    {
      sequelize,
      modelName: "LaboratoryRequest",
    }
  );
 
  return LaboratoryRequest;
};

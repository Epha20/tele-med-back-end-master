("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
     
    }
  }
  Appointment.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    chatRoomID:
    {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "ChatRooms",
            key: "id",
        }},
    deescription:
    {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date:
    {
        type: DataTypes.DATE,
        allowNull: false,
    }

      
     
       

 
       
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
 
  return Appointment;
};

("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LaboratoryTestRquest extends Model {
    static associate(models) {
        LaboratoryTestRquest.belongsTo(models.LaboratoryRequest, {
            foreignKey: "laboratoryRequestId",
        });
        LaboratoryTestRquest.belongsTo(models.LaboratoryTest, {
            foreignKey: "laboratoryTestId",
        });
 
    }
  }
  LaboratoryTestRquest.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
        laboratoryRequestId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "LaboratoryRequests",
            key: "id",
        }},
        laboratoryTestId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "LaboratoryTests",
            key: "id",
        }},
        


 
       
    },
    {
      sequelize,
      modelName: "LaboratoryTestRquest",
    }
  );
 
  return LaboratoryTestRquest;
};

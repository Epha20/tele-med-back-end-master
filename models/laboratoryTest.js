("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LaboratoryTest extends Model {
    static associate(models) {
      LaboratoryTest.belongsTo(models.Laboratory, {
        foreignKey: "laboratoryId",
      });
      LaboratoryTest.hasMany(models.LaboratoryReport, {
        foreignKey: "laboratoryTestId",
      });
      
        
    }
  }
  LaboratoryTest.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      laboratoryId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Laboratories",
          key: "id",
        },
      },
      Name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      price:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      

       
    },
    {
      sequelize,
      modelName: "LaboratoryTest",
    }
  );
 
  return LaboratoryTest;
};

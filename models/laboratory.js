("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Laboratory extends Model {
    static associate(models) {
      Laboratory.hasMany(models.LaboratoryTest, {
        foreignKey: "laboratoryId",
      });
        Laboratory.hasMany(models.LaboratoryReport, {
        foreignKey: "laboratoryId",
        });
        Laboratory.belongsTo(models.HealthCare, {
        foreignKey: "halthcarId",
        });
        
    }
 
  }
  Laboratory.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    LaboratoryTechnician:{
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: "MedicalStaffs",
          key: "id",
      }},
     halthcarId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "HealthCares",
            key: "id",
        }},
        

       
    },
    {
      sequelize,
      modelName: "Laboratory",
    }
  );
 
  return Laboratory;
};

("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pharmacy extends Model {
    static associate(models) {
        Pharmacy.hasMany(models.Medicine, {
            foreignKey: "pharmacyId",
        });
        Pharmacy.belongsTo(models.MedicalStaff, {
            foreignKey: "pharmacyTechnician",
        });
        Pharmacy.belongsTo(models.HealthRecord, {
            foreignKey: "healthcareId",
        });




        
    }
  }
  Pharmacy.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      
        pharmaciest:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "MedicalStaffs",
            key: "id",
        }},
        healthcareId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "HealthCares",
            key: "id",
        }},

 
        address:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        longitude:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        latitude:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        online:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        open:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        openTime:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        closeTime:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        openDays:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        closeDays:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        isApproed:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isVerified:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        inProgress:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }





       
    },
    {
      sequelize,
      modelName: "Pharmacy",
    }
  );
 
  return Pharmacy;
};

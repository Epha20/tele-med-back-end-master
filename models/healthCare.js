("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HealthCare extends Model {
    static associate(models) {
         HealthCare.belongsTo(models.User, { foreignKey: "HealthCareAdmin" })
            // HealthCare.hasOne(models.Pharmacy, { foreignKey: "pharmacyID" });
            // HealthCare.hasOne(models.Laboratory, { foreignKey: "laboratoryID" });

        
        
    }
  }
  HealthCare.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
     
      
        HealthCareAdmin:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        }},
        //  pharmacyID:{
        // type: DataTypes.UUID,
        // allowNull: true,
        // references: {
        //     model: "Pharmacies",
        //     key: "id",
        // }},
        //     laboratoryID:{
        // type: DataTypes.UUID,
        // allowNull: true,
        // references: {
        //     model: "Laboratories",
        //     key: "id",
        // }},

        backgroundImage:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        HealthCareName:{
            type: DataTypes.STRING,
            allowNull: false,
        }
        ,
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        }
        ,
        phoneNumber:{
            type: DataTypes.STRING,
            allowNull: true,
        }
        ,
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        }
        ,
        website:{
            type: DataTypes.STRING,
            allowNull: true,
        }
        ,
        description:{
            type: DataTypes.STRING,
            allowNull: true,
        }
        ,
        longitude:{
            type: DataTypes.STRING,
            allowNull: true,
        }
        ,
        latitude:{
            type: DataTypes.STRING,
            allowNull: true,
        }
        ,
        openingHours:{
            type: DataTypes.STRING,
            allowNull: true,
        }
        ,
        closingHours:{
            type: DataTypes.STRING,
            allowNull: true,
        }
        ,
        openDays:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        closeDays:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        is24Hours:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
        ,
        isOnline:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
        ,
        isVerified:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
        ,
        isApproved:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
        ,
        isDeleted:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
        ,
        isSuspended:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
        ,
        isBlocked:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
        ,



       
    },
    {
      sequelize,
      modelName: "HealthCare",
    }
  );
 
  return HealthCare;
};

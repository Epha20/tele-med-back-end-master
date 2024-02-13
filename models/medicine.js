("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    static associate(models) {
        Medicine.belongsTo(models.Pharmacy, {
            foreignKey: "pharmacyId",
        }); 
        
    }
  }
  Medicine.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      pharmacyId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Pharmacies",
            key: "id",
        }},

        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiryDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        manufacturer:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        sideEffects:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        dosage:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt:{
            type: DataTypes.DATE,
            allowNull: false,
        }


      

       
    },
    {
      sequelize,
      modelName: "Medicine",
    }
  );
 
  return Medicine;
};

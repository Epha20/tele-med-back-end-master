("use strict");
const { Model } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
     
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
       
      },
      lastName:{
        type: DataTypes.STRING,
       
      },
      email: {
        type: DataTypes.STRING,
       unique:true
      },
      phone: {
        type: DataTypes.STRING,
       
      },
      password: {
        type: DataTypes.STRING,
      },

    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
    }
  );
  User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});
  return User;
};

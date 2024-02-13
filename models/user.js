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
      image: {
        type: DataTypes.STRING,
      },
      role: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastOnline: {
        type: DataTypes.DATE,
      },
      password: {
        type: DataTypes.STRING,
      },
      

    },
    {
      sequelize,
      modelName: "User",
      // freezeTableName: true,
    }
  );
//   User.beforeUpdate((user, options) => {

//     return bcrypt.hash(user.password, 10)
//         .then(hash => {
//             user.password = hash;
//         })
//         .catch(err => { 
//             throw new Error(); 
//         });
// });




  User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});
  return User.schema('telemed');
};

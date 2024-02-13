const User = require("../models/index").User;
const bcrypt = require('bcrypt');
exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    return next(error);
  }
};

exports.Register = async (req, res, next) => {
  try {
    const userCheck = await User.findOne({ where: { phone: req.body.phone, email: req.body.email } });
    if(userCheck){
    const user = await User.create(req.body);
    res.send(user);
    }
    else{
      res.status(400).send({errorMsg:"User already exists"});
    }
  } catch (error) {
    return next(error);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    console.log(req.params)
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next("User not found");
    }
    res.send(user);
  } catch (error) {
    return next(error);
  }
};

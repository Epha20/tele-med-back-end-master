const User = require("../../models/index").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.allUsers = async (req, res , next) => {
  console.log("req.params")
  try {
    const users = await User.findAll({  attributes: { exclude: ['password'] } });
    res.send(users);
  } catch (error) {
     
     next(error);
  }
};

exports.Register = async (req, res, next) => {
  try {
    req.body['role']="test"
    console.log(req.body);
    let userCheck = await User.findOne({ where: { phone: req.body.phone } || { email: req.body.email }});
    if(userCheck){
      res.status(400).send({errorMsg:"User already exists"});
    }
    

     
    const user = await User.create(req.body);
    let jwtSecretKey = process.env.JWT_SECRET;
    let data = {
        time: Date(),
        userId: user.id,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
    user.token = token;
    const newUser= {
      user:user,
      token:token
    }

   return res.send(newUser);
    
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
exports.login = async (req, res, next) => {
  console.log("req.body",req.body)
  try {
    const user = await User.findOne({ where: { phone: req.body.phone } });
    if (!user) {
      return res.status(400).send({errorMsg:"Invalid phone number" });
    }
  

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send({errorMsg:"Invalid password or phone"});
    }
    let jwtSecretKey = process.env.JWT_SECRET;
    let data = {
        time: Date(),
        userId: user.id,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
    user.token = token;
    const newUser= {
      user:user,
      token:token
    }
    
    return res.send(newUser);
  } catch (error) {
    next(error);
  }
};
     
  
 


exports.findOne = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } });
   console.log("user",!user)
    if (!user) {
      return res.status(400).send("User not found");
    }
    return res.send(user);
    
  } catch (error) {
    console.log(error);
     next(error);
  }
};


exports.updateOne = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next("User not found");
    }
    req.body.updatedAt = Date.now();
    await user.update(req.body);
    return res.send(user);
  } catch (error) {
    next(error);
  }
}
exports.deleteOne = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.send("User not found");
    }
    await user.destroy();
    return res.send(user);
  } catch (error) {
    next(error);
  }
}

exports.deleteAllUsers = async (req, res, next) => {
  try {
    await User.destroy({ where: {}, truncate: false });
    return res.send("All users deleted");
  } catch (error) {
    next(error);
  }
}

exports.checkUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { phone: req.body.phoneNumber } });
    if(req.body.type=="register"){
      console.log("req.body",req.body)
      if (user) {
        return res.status(400).send({errorMsg:"User already exists" });
      }else{
        return res.send({successMsg:"User does not exists" });
      }
    }else if(req.body.type=="forgetPassword"){
      if (!user) {

        return res.status(400).send({errorMsg:"User not found" });
      }else{

        return res.send({successMsg:"User found" });
      }
    }

  } catch (error) {
    next(error);
  }
}
exports.forgetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne
    ({ where: { phone: req.body.phoneNumber } });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // user.updatedAt = Date.now();
    const password = bcrypt.hashSync(req.body.password, 10);
   const userUpdateed =  await user.update({password:password})
   return res.send(userUpdateed);
   
  
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.deleteUserPhoto = async (req, res, next) => {
  try {
    console.log("req.params.id",req.params.id)
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(400).send("User not found");
    }
    if(user.image || user.image != null|| user.image != undefined || user.image != ""){
      const fs = require('fs');
      const path = './'+user.image
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log("file removed")
        //file removed
      })


      
    }
    user.image = null;
    await user.save();
    return res.send(user);
  } catch (error) {
    next(error);
  }
}


exports.updateUserPhoto = async (req, res) => {
   
 
  try {
    
      let imagePath = req.file.path.replace(/\\/g, "/");
      console.log("imagePath",imagePath)
      const user = await User.findByPk(req.params.id)
      if (!user) {
        return res.status(401).send()
      }
      if(user.image || user.image != null|| user.image != undefined || user.image != ""){
        const fs = require('fs');
      
        const path = './'+user.image 
        console.log("path",path)
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err)
            return
          }
          //file removed
        })
        
      }
      user.image = imagePath;
      console.log("user find data",user)
    
      await user.update({image:imagePath})
      

    return res.send(user)

  } catch (error) {
      // next(error)

      console.log("error",error)
      return res.send(error)
  }
}



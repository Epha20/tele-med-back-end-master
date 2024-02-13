const { use } = require("../../routes/laboratoryRequest.routes");

const MedicalStaff = require("../../models/index").MedicalStaff
const User = require("../../models/index").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// create one MedicalStaff
exports.createMedicalStaff = async (req, res, next) => {
  // console.log(JSON.stringify(req));
  try {
    let userCheck = await User.findOne({ where: { phone: req.body.user.phone, email: req.body.user.email } });
    if (userCheck) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await User.create(req.body.user)
    let jwtSecretKey = process.env.JWT_SECRET;
    let data = {
      time: Date(),
      userId: user.id,
    }

    const token = jwt.sign(data, jwtSecretKey);
    user['token'] = token;
    const newUser = {
      user: user,
      token: token
    }
    console.log("token " + token)
    if (user) {
      const medicalStaff = await MedicalStaff.create({
        workExperiance: req.body.workExperiance,
        role: req.body.user.role,
        specialization: req.body.specialization,
        educationDegree: req.body.educationDegree,
        userID: user.id,
        HealthCareID: req.body.HealthCareID,
        workExperiance: req.body.workExperiance,
      });

      user.exclude = ['password'];
      return res.status(200).json({ success: true, message: "User created successfully", user: newUser.user, MedicalStaff: medicalStaff, token: token });
    }
    else {
      return res.status(400).json({ success: false, message: "User not created" });
    }


  } catch (error) {
    console.log(error);


    return next(error);
  }
};

// get all MedicalStaff

exports.getAllPMedicalStaff = async (req, res, next) => {

  try {
    const medicalStaff = await MedicalStaff.findAll({ include: User, exclude: ['password'] });
    res.send(medicalStaff);

  } catch (error) {
    next(error);
  }
};

// get one MedicalStaff

exports.getOneMedicalStaff = async (req, res, next) => {
  try {
    const medicalStaff = await MedicalStaff.findOne({ where: { id: req.params.id }, include: User, exclude: ['password'] });
    if (medicalStaff) {
      res.send(medicalStaff);
    }
    else {
      res.status(400).send({ errorMsg: "MedicalStaff not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.getMedicalStaffByUserID = async (req, res, next) => {
  try {
    const medicalStaff = await MedicalStaff.findOne({ where: { userID: req.params.id }, include: User, exclude: ['password'] });
    if (medicalStaff) {
      res.send(medicalStaff);
    } else {
      res.status(400).send({ errorMsg: "MedicalStaff not found" });
    }
  } catch (error) {
    next(error);
  }
};


exports.getAllInProcessMedicalStaff = async (req, res, next) => {
  try {
    const medicalStaff = await MedicalStaff.findAll({ where: { idProccessing: true }, include: User, exclude: ['password'] });
    res.send(medicalStaff);
  } catch (error) {
    next(error);
  }
};



// update one MedicalStaff
exports.updateOne = async (req, res, next) => {

  try {
    const medicalStaff = await MedicalStaff.findOne({ where: { id: req.params.id } });
    if (!medicalStaff) {
      return res.status(400).send("User not found");
    }
    req.body.updatedAt = new Date();
    await medicalStaff.update(req.body);
    res.send(medicalStaff);
  } catch (error) {
    next(error);
  }
}

// delete one MedicalStaff
exports.deleteOneMedicalStaff = async (req, res, next) => {
  try {
    const medicalStaff = await MedicalStaff.findOne({ where: { id: req.params.id } });
    console.log(MedicalStaff);
    if (!medicalStaff) {
      return res.status(400).send("MedicalStaff not found");
    }
    const user = await User.findOne({ where: { id: medicalStaff.userID } });

    if (!user) {
      return res.status(400).send("User not found");
    }
    await medicalStaff.destroy({ include: User });
    await user.destroy();

    res.send("User deleted");
  } catch (error) {
    next(error);
  }
}

// delete all MedicalStaff
exports.deleteAllMedicalStaff = async (req, res, next) => {
  try {
    const user = await MedicalStaff.findAll()
    if (!user) {
      return res.status(400).send("MedicalStaff not found");
    }
    await MedicalStaff.destroy({ where: {}, truncate: false });
    res.send("All MedicalStaff deleted");
  } catch (error) {
    next(error);
  }
}

exports.updateDegreePhoto = async (req, res, next) => {

  try {

    let imagePath = req.file.path.replace(/\\/g, "/");
    const medicalStaff = await MedicalStaff.findOne({ where: { id: req.params.id } })

    if (!medicalStaff) {
      return res.status(401).send("MedicalStaff not found")
    }
    if (medicalStaff.educationDegree || medicalStaff.educationDegree != "") {
      const fs = require('fs');
      const path = './' + medicalStaff.educationDegree
      console.log("path", path)
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        //file removed
      })

    }
    medicalStaff.educationDegree = imagePath;
    await medicalStaff.save()


    return res.send(medicalStaff)

  } catch (error) {
    next(error)
  }
}

exports.deleteDegreePhoto = async (req, res, next) => {
  try {

    const medicalStaff = await MedicalStaff.findOne({ id: req.params.id });
    if (!medicalStaff) {
      return res.status(400).send("User not found");
    }
    if (medicalStaff.educationDegree || medicalStaff.educationDegree != "") {
      const fs = require('fs');
      const path = './' + medicalStaff.educationDegree
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log("file removed")
        //file removed
      })
    }
    medicalStaff.educationDegree = "";
    await medicalStaff.save();
    return res.send(medicalStaff);
  } catch (error) {
    next(error);
  }

}

exports.getAllAuthMedicalStaff = async (req, res, next) => {

  try {
    const medicalStaff = await MedicalStaff.findAll({ where: { healthcarAdminAUtorization: true }, include: User, exclude: ['password'] });
    res.send(medicalStaff);

  } catch (error) {
    next(error)
  }
}

exports.getAllNotAuthMedicalStaff = async (req, res, next) => {
  try {
    const medicalStaff = await MedicalStaff.findAll({ where: { healthcarAdminAUtorization: false }, include: User, exclude: ['password'] });
    res.send(medicalStaff);
  } catch (error) {
    next(error)
  }
}

exports.getSingleMedicalStaffAuthStatus = async (req, res, next) => {
  try {
    const medicalStaff = await MedicalStaff.findOne({ where: { userID: req.params.id }, include: User, exclude: ['password'] });
    if (medicalStaff) {
      var status = medicalStaff.healthcarAdminAUtorization;
      res.send(medicalStaff);
    } else {
      res.status(400).send({ errorMsg: "MedicalStaff not found" });
    }
  } catch (error) {
    next(error)
  }
}

exports.getAllAuthorizedMedicalStaffByHealthCare = async (req, res, next) => {
  try {
    const medicalStaff = await MedicalStaff.findAll({ where: { healthcarAdminAUtorization: true, HealthCareID: req.params.id }, include: User, exclude: ['password'] });
    res.send(medicalStaff);
  } catch (error) {
    next(error)
  }
}

exports.getAllNotAuthMedicalStaffByHealthCare = async (req, res, next) => {
  try {
    const medicalStaff = await MedicalStaff.findAll({ where: { healthcarAdminAUtorization: false, HealthCareID: req.params.id }, include: User, exclude: ['password'] });
    res.send(medicalStaff);
  } catch (error) {
    next(error)
  }
}

const patient = require("../../models/patient");

const User = require("../../models/index").User;
// const Patient = require("../../models/index").patient
const Patient = require("../../models/index").Patient;



// create one patient
exports.createPatient = async (req, res, next) => {

  try {
    let userCheck = await User.findOne({ where: { phone: req.body.phone } });
    console.log("userCheck");
     
    console.log(userCheck);
    if (userCheck) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
    const newUser =  await User.create(req.body).then((user) => {
      const patient = Patient.create({
        bloodtype: req.body.bloodtype,
        userID: user.id,
      });
      return  res.status(200).json({ success: true, message: "User created successfully",  user: user, patient:patient }); }); 
    
 
 
    
    
  
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
 

  return next(error);
  }
};

// get all patient

exports. getAllPpatient = async (req, res, next) => {
  try {
     const patient = await Patient.findAll({ include: User });
      res.send(patient);

  } catch (error) {
    next(error);
  }
};

// get one patient

exports.getOnePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id } }); 
    res.send(patient); 
  } catch (error) {
    next(error);
  }
};

// update one patient
exports.updateOnePatient = async (req, res, next) => {

    try {
        const patient = await Patient.findOne({ where: { id: req.params.id } });
        if (!patient) {
            return res.status(400).send("User not found");
        }
        req.body.updatedAt = new Date();
        await patient.update(req.body);
        res.send(patient);
    } catch (error) {
        next(error);
    } 
}

// delete one patient
exports.deleteOnePatient  = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id } });
     console.log(patient);
    if (!patient) {
      return res.status(400).send("Patient not found");
    }
    const user = await User.findOne({ where: { id: patient.userID } });

    if(!user){
      return res.status(400).send("User not found");
    }
    await patient.destroy(  {include: User});
    await user.destroy();
  
    res.send("User deleted");
  } catch (error) {
    next(error);
  }
}

// delete all patient
exports.deleteAllPatient = async (req, res, next) => {
  try {
    const user = await Patient.findAll()
    if (!user) {
      return res.status(400).send("Patient not found");
    }
    await Patient.destroy({ where: {}, truncate: false });
    res.send("All Patient deleted");
  } catch (error) {
    next(error);
  }
}
 
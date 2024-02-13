const express = require("express");
const { createPatient,getAllPpatient,getOnePatient,updateOnePatient,deleteOnePatient,deleteAllPatient } = require("../controller/UserController/patient.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");
// router.get('/', protect,allUsers);
router.post('/patient_register',protect,createPatient)
router.get('/all_patient',protect,getAllPpatient)
router.get('/patient/:id',protect,getOnePatient)
router.put('/updatePatient/:id',protect,updateOnePatient)
router.delete('/delete_patient/:id',protect,deleteOnePatient)
router.delete('/delete_all_patient',protect,deleteAllPatient)

 
module.exports = router;

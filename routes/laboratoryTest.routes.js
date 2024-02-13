const express = require("express");
const {createLaboratoryTest,getOneLaboratoryTest,getAllLaboratoryTest,updateLaboratoryTest,deleteLaboratoryTest,deleteAllLaboratoryTest } = require("../controller/LaboratoryTestController/laboratoryTest.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");
 
router.post('/createLaboratoryTest',protect,createLaboratoryTest)
router.get('/getOneLaboratoryTest/:id',protect,getOneLaboratoryTest)
router.get('/getAllLaboratoryTest',protect,getAllLaboratoryTest)
router.put('/updateLaboratoryTest/:id',protect,updateLaboratoryTest)
router.delete('/deleteLaboratoryTest/:id',protect,deleteLaboratoryTest)
router.delete('/deleteAllLaboratoryTest',protect,deleteAllLaboratoryTest)

 
module.exports = router;

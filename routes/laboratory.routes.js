const express = require("express");
const {createLaboratory,getOneLaboratory, getAllLaboratory ,updateLaboratory, deleteAllLaboratory } = require("../controller/LaboratoryController/laboratory.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");
 
router.post('/createLaboratory',protect,createLaboratory)
router.get('/getOneLaboratory/:id',protect,getOneLaboratory)
router.get('/getAllLaboratory',protect,getAllLaboratory)
router.put('/updateLaboratory/:id',protect,updateLaboratory)
router.delete('/deleteAllLaboratory',protect,deleteAllLaboratory)
 
module.exports = router;

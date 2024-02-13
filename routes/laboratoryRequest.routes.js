const express = require("express");
const { createLaboratoryRequest,getOneLaboratoryRequest,getAllLaboratoryRequestByChatRoomId,getAllLaboratoryRequest ,updateLaboratoryRequest,deleteLaboratoryRequest,deleteAllLaboratoryRequestOFChatRoom,deleteAllLaboratoryRequest} = require("../controller/LaboratoryRequestController/laboratoryRequest.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");
 
router.post('/createLaboratoryRequest',protect, createLaboratoryRequest)
router.put('/updateLaboratoryRequest/:id',protect,updateLaboratoryRequest)
router.get('/getOneLaboratoryRequest/:id',protect,getOneLaboratoryRequest)
router.get('/getAllLaboratoryRequestByChatRoomId/:id',protect,getAllLaboratoryRequestByChatRoomId)
router.get('/getAllLaboratoryRequest',protect,getAllLaboratoryRequest)
router.delete('/deleteLaboratoryRequest/:id',protect,deleteLaboratoryRequest)
router.delete('/deleteAllLaboratoryRequestOFChatRoom/:id',protect,deleteAllLaboratoryRequestOFChatRoom)
router.delete('/deleteAllLaboratoryRequest',protect,deleteAllLaboratoryRequest)

 

 
module.exports = router;

const express = require("express");
const {createHealthCare,getAllHealthCare,getOneHealthCare,updateHealthCare,deleteHealthCare,deleteAllHealthCare,updateHealthcareBackgroundPhoto,deleteHealthcareLogoPhoto,updateHealthcareLogoPhoto,deleteHealthcareBackgroundPhoto,getAllAuthorizedHealthCare,getAllUnAuthorizedHealthCare} = require("../controller/HealthCareController/healthCare.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");
const multer = require('multer')
 
const storage = multer.diskStorage({
    
    destination:function(req,file,cb){
                  cb(null,'./images/Healthcare_Images/');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+file.originalname);
    }
})
const upload = multer({
       storage:storage

})

router.post('/backgroundphoto/update/:id', protect,upload.single('image'),updateHealthcareBackgroundPhoto );
router.delete('/backgroundphoto/delete/:id',protect, deleteHealthcareBackgroundPhoto );
router.post('/logophoto/update/:id', protect,upload.single('image'),updateHealthcareLogoPhoto );
router.delete('/logophoto/delete/:id',protect, deleteHealthcareLogoPhoto );
router.post('/createHealthCare',protect,createHealthCare)
router.get('/allHealthCare',protect,getAllHealthCare)
router.get('/healthCare/:id',protect,getOneHealthCare)
router.put('/updateHealthCare/:id',protect,updateHealthCare)
router.delete('/deleteHealthCare/:id',protect,deleteHealthCare)
router.delete('/deleteAllHealthCare',protect,deleteAllHealthCare)
router.get('/allAuthorizedHealthCare',protect,getAllAuthorizedHealthCare)
router.get('/allUnAuthorizedHealthCare',protect,getAllUnAuthorizedHealthCare)



 
module.exports = router;

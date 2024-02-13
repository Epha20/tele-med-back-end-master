const express = require("express");
const {getAllMedicine,createMedicine,getOneMedicine,updateMedicine,deleteMedicine,deleteAllMedicine,getAllMedicineByPharmacy,uploadMedicineImage,removeMedicineImage } = require("../controller/MedicineController/medicine.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");
const multer = require('multer')

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './images/Pharmacy_Images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({
    storage: storage

})

router.post('/createMedicine', protect, createMedicine)
router.get('/allMedicine', protect, getAllMedicine)
router.get('/:id', protect, getOneMedicine)
router.put('/updateMedicine/:id', protect, updateMedicine)
router.delete('/deleteMedicine/:id', protect, deleteMedicine)
router.delete('/deleteAllMedicine', protect, deleteAllMedicine)
router.get('/getAllMedicineByPharmacy/:id', protect, getAllMedicineByPharmacy)
router.post('/uploadMedicineImage/:id', protect, upload.single('image'), uploadMedicineImage);
router.delete('/removeMedicineImage/:id', protect, removeMedicineImage);






 
module.exports = router;
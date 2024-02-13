const express = require("express");
const { createPharmacy, getAllPharmacy, getOnePharmacy, updatePharmacy, deletePharmacy, deleteAllPharmacy, getPharmaciesByMedicIdMedicineName, uploadPharamcyLogoPhoto, removePharamcyLogoPhoto, getAllAuthorizedPharmacies, getallNotAuthorizedPharmacies, getAllInprogressPharmacies } = require("../controller/PharmacyController/pharmacy.controller");
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


router.post('/createPharmacy',protect, createPharmacy)
router.get('/allPharmacy',protect, getAllPharmacy)
router.get('/:id',protect, getOnePharmacy)
router.put('/updatePharmacy/:id',protect, updatePharmacy)
router.delete('/deletePharmacy/:id',protect, deletePharmacy)
router.delete('/deleteAllPharmacy', protect,deleteAllPharmacy)
router.get('/getPharmaciesByMedicIdMedicineName/:medicineName', protect,getPharmaciesByMedicIdMedicineName)
router.post('/uploadPharamcyLogoPhoto/:id',protect, upload.single('image'), uploadPharamcyLogoPhoto);
router.delete('/removePharamcyLogoPhoto/:id',protect, removePharamcyLogoPhoto);
router.get('/getAllAuthorizedPharmacies', protect, getAllAuthorizedPharmacies)
router.get('/getallNotAuthorizedPharmacies',protect, getallNotAuthorizedPharmacies)
router.get('/getAllInprogressPharmacies', protect,getAllInprogressPharmacies)



module.exports = router;
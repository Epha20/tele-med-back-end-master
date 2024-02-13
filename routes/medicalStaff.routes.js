const express = require("express");
const { createMedicalStaff, getAllPMedicalStaff, getOneMedicalStaff, updateOne, deleteOneMedicalStaff, updateDegreePhoto, deleteDegreePhoto, getAllAuthMedicalStaff, getAllNotAuthMedicalStaff, getAllInProcessMedicalStaff, getMedicalStaffByUserID, getSingleMedicalStaffAuthStatus, getAllAuthorizedMedicalStaffByHealthCare,getAllNotAuthMedicalStaffByHealthCare } = require("../controller/UserController/medicalStaff.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");
const multer = require('multer')

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './images/Education_proof/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({
    storage: storage

})

router.post('/degree/update/:id', upload.single('image'), updateDegreePhoto);
router.delete('/degree/delete/:id', protect, deleteDegreePhoto);

// router.get('/', protect,allUsers);
router.post('/createMedicalStaff', createMedicalStaff)
router.get('/allMedicalStaff', protect, getAllPMedicalStaff)
router.get('/medicalStaff/:id', protect, getOneMedicalStaff)
router.put('/updateMedicalStaff/:id', protect, updateOne)
router.delete('/deleteMedicalStaff/:id', protect, deleteOneMedicalStaff)
// router.delete('/delete_all_patient',deleteAllPatient)

router.get('/allAuthMedicalStaff', protect, getAllAuthMedicalStaff)
router.get('/allNotAuthMedicalStaff', protect, getAllNotAuthMedicalStaff)
router.get('/allInProcessMedicalStaff', protect, getAllInProcessMedicalStaff)
router.get('/getMedicalStaffByUserID/:id', protect, getMedicalStaffByUserID)
router.get('/getSingleMedicalStaffAuthStatus/:id', getSingleMedicalStaffAuthStatus)
router.get('/allAuthorizedMedicalStaffByHealthCare/:id', protect, getAllAuthorizedMedicalStaffByHealthCare)
router.get('/allNotAuthMedicalStaffByHealthCare/:id', protect, getAllNotAuthMedicalStaffByHealthCare)





module.exports = router;

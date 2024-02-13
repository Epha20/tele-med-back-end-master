const express = require("express");

const { allUsers, Register, findOne, deleteOne, updateOne, login, deleteAllUsers, checkUser, forgetPassword, updateUserPhoto, deleteUserPhoto } = require("../controller/UserController/user.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");
const { decodeToken } = require("../middlewares/firebase-token");
const multer = require('multer')

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './images/User');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({
    storage: storage

})


router.post('/photo/update/:id', upload.single('image'), updateUserPhoto);
router.delete('/photo/delete/:id',protect, deleteUserPhoto);
router.get('/', protect, allUsers);
router.post('/register', Register)
// router.post('/register',decodeToken, Register)
router.post('/login', login);
router.get('/:id', protect, findOne)
router.delete('/:id', protect, deleteOne)
router.put('/:id', protect, updateOne)
router.post('/checkuser', checkUser)
router.delete('/delete_all_user', protect, deleteAllUsers)
router.post('/changePassword',decodeToken, forgetPassword)
// router.post('/changePassword',decodeToken,forgetPassword)

module.exports = router;

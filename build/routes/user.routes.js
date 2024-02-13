const express = require("express");
const { allUsers,Register, findOne, Filter } = require("../controller/user.controller");
const router = express.Router();
router.get('/', allUsers);
router.post('/register',Register)
router.get('/:id',findOne)
module.exports = router;

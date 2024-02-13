const express = require("express");
const {createChatRoom,findChatRoom,findChatRoomsUser,findAllChatRooms,updateChatRoom,deleteOne,deleteAllChatRoomUser,deleteAllChatRoom} = require("../controller/ChatRoomController/chatRoom.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");

router.post('/createChatRoom',protect,createChatRoom)
router.get('/findChatRoomsUser',protect,findChatRoomsUser)
router.get('/findChatRoom/:id',protect,findChatRoom)
router.get('/findAllChatRooms',protect,findAllChatRooms)
router.put('/updateChatRoom/:id',protect,updateChatRoom)
router.delete('/deleteOne/:id',protect,deleteOne)
router.delete('/deleteAllChatRoomUser',protect,deleteAllChatRoomUser)
router.delete('/deleteAllChatRoom',protect,deleteAllChatRoom)
 

 
module.exports = router;

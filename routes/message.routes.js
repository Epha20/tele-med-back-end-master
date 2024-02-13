const express = require("express");
const {createMessage,getAllMessages,getAllChatRoomMessages,getOneMessage,updateMessage,deleteMessage,deleteAllChatRoomMessages,deleteAllMessages} = require("../controller/MessageController/message.controller");
const router = express.Router();
const { protect, admin } = require("../middlewares/token");

router.post('/createMessage',protect,createMessage)
router.get('/getAllMessages',protect,getAllMessages)
router.get('/getAllChatRoomMessages/:id',protect,getAllChatRoomMessages)
router.get('/getOneMessage/:id',protect,getOneMessage)
router.put('/updateMessage/:id',protect,updateMessage)
router.delete('/deleteMessage/:id',protect,deleteMessage)
router.delete('/deleteAllChatRoomMessages/:id',protect,deleteAllChatRoomMessages)
router.delete('/deleteAllMessages',protect,deleteAllMessages)


 
module.exports = router;

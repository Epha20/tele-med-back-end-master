const ChatRoom = require("../../models/index").ChatRoom;

 


exports.chatRooms = async (req, res , next) => {
  
  try {
    const chatRoom = await ChatRoom.findAll();
    res.send(chatRoom);
  } catch (error) {
     
     next(error);
  }
};

exports.createChatRoom = async (req, res, next) => {
  try {
    console.log(req.body);
    let checkChatRoom = await ChatRoom.findOne({ where: { patientID: req.body.patientID  } && { medicalStaffID: req.body.medicalStaffID } });
    if(checkChatRoom){
      return   res.status(400).send("chat already exists");
    }     
    const chatRoom = await ChatRoom.create(req.body);
   return res.send(chatRoom);
    
  } catch (error) {
    return next(error);
  }
};

     
  


exports.findChatRoomsUser = async (req, res, next) => {
  try {
    // const chatRoom = await ChatRoom.findAll({ where: { patientId: req.body.patientID } });
    const chatRoom  =  await ChatRoom.findAll({ where: { patientID: req.body.patientID  } ||  { medicalStaffID: req.body.medicalStaffID } });
    if (!chatRoom) {
      return res.status(400).send("chat rooms not found");
    }
    return res.send(chatRoom);

  } catch (error) {
     next(error);
  }
};

exports.findChatRoom = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const chatRoom = await ChatRoom.findByPk(req.params.id);
    if (!chatRoom) {
      return res.status(400).send("chat rooms not found");
    }
    return res.send(chatRoom);

  } catch (error) {

    next(error);
  }
};
exports.findAllChatRooms = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findAll();
    if (!chatRoom) {
      return res.status(400).send("chat rooms not found");
    }
    return res.send(chatRoom);
    
  } catch (error) {
    next(error);
  }
};



exports.updateChatRoom = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findByPk(req.params.id);

    if (!chatRoom) {
      return res.status(400).send("chat rooms not found");
    }
    req.body.updatedAt = new Date();
    await chatRoom.update(req.body);
    return res.send(chatRoom);
  } catch (error) {
    next(error);
  }
}
exports.deleteOne = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findByPk(req.params.id);
    if (!chatRoom) {
      return res.status(400).send("chat rooms not found");
    }
    await chatRoom.destroy();
    return   res.send("chat room are 2 deleted");
  } catch (error) {
    next(error);
  }
}
exports.deleteAllChatRoomUser = async (req, res, next) => {
  console.log("chatRoom");
  try {
    const chatRoom = await ChatRoom.findAll({ where: { patientID: req.body.patientID  } ||  { medicalStaffID: req.body.medicalStaffID } });

    if (!chatRoom) {
      return res.send({error:"chat room is not found"});
    }
    await ChatRoom.destroy({ where: { patientID: req.body.patientID  } ||  { medicalStaffID: req.body.medicalStaffID },truncate: false });
    return res.status(400).send("chat rooms for the are deleted");
  
  } catch (error) {
    next(error);
  } 
}

exports.deleteAllChatRoom = async (req, res, next) => {
  try {
    await ChatRoom.destroy({ where: {}, truncate: false });
    return res.send("chat rooms 1 are deleted");
  } catch (error) {
    next(error);
  }
}


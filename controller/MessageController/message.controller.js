const Message = require("../../models/index").Message;
// import io from index.js



exports.createMessage = async (req, res , next) => {
    
    try {
        const message = await Message.create(req.body);
    return res.send(message);
        
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.getAllMessages = async (req, res , next) => {
        
        try {
            const message = await Message.findAll();
        return res.send(message);
            
        } catch (error) {
            return next(error);
        }
    }
exports.getAllChatRoomMessages = async (req, res, next) => {
    try {
        const message = await Message.findAll({ where: { chatRoomID: req.params.id } });
        if (!message) {
            return res.status(400).send("message is not found");
        }
        return res.send(message);

    } catch (error) {

        next(error);
    }
};
exports.getOneMessage = async (req, res, next) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (!message) {
            return res.status(400).send( "message is not found");
        }
        return res.send(message);

    } catch (error) {

        next(error);
    }
}

exports.updateMessage = async (req, res, next) => {
    try {
        const message = await Message.findByPk(req.params.id);

        if (!message) {
            return  res.status(400).send( "message is not found");
        }
        req.body.updatedAt = new Date();
        await message.update(req.body);
        return res.send(message);

    } catch (error) {
        return next(error);
    }
}
 
exports.deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (!message) {
            return  res.status(400).send( "message is not found");
        }
        await message.destroy();
        return res.send(message);
    } catch (error) {
        return next(error);
    }
}
exports.deleteAllChatRoomMessages = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const message = await Message.findAll({ where: { chatRoomID: req.params.id } });
        if (!message) {
            return res.status(400).send( "message is not found");
        }
        console.log(message);
        await Message.destroy({ where: { chatRoomID: req.params.id }, truncate: false });
        return res.send(message);
    } catch (error) {
        return next(error);

    }
}
exports.deleteAllMessages = async (req, res, next) => {
    try {
        const message = await Message.findAll();
        if (!message) {
            return res.status(400).send( "message is not found");
        }
        await message.destroy({where:{},truncate: false });
        return res.send(message);
    } catch (error) {
        return next(error);
    }
}


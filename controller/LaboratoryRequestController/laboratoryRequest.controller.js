const LaboratoryTest = require("../../models/index").LaboratoryTest;
const Laboratory = require("../../models/index").Laboratory;
const LaboratoryRequest     = require("../../models/index").LaboratoryRequest;

exports.createLaboratoryRequest = async (req, res, next) => {
    try {
        const laboratoryRequest = await LaboratoryRequest.create(req.body);
        return res.send(laboratoryRequest);
    } catch (error) {
        return next(error);
    }
    }
exports.getAllLaboratoryRequest =async (req, res , next)  => {
    try {
        const laboratoryRequest = await LaboratoryRequest.findAll();
        return res.send(laboratoryRequest);
    } catch (error) {
        return next(error);
    }
    }
exports.getOneLaboratoryRequest = async (req, res , next)  => {
    try {
        const laboratoryRequest = await LaboratoryRequest.findByPk(req.params.id);
        if (!laboratoryRequest) {
             
            return res.status(400).send("Laboratory Request is not found");
        }
        return res.send(laboratoryRequest);
    } catch (error) {
        return next(error);
    }
    }
exports.getAllLaboratoryRequestByChatRoomId = async (req, res, next) => {
    try {
        const laboratoryRequest = await LaboratoryRequest.findAll({
            where: {
                chatRoomID: req.params.id
            }
        });
        return res.send(laboratoryRequest);
    } catch (error) {
        return next(error);
    }
    }

exports.getAllLaboratoryRequest = async (req, res, next) => {

    try {
        const laboratoryRequest = await LaboratoryRequest.findAll();
        return res.send(laboratoryRequest);
    } catch (error) {
        return next(error);
    }
    }


exports.updateLaboratoryRequest = async (req, res , next) => {
    try {
        const laboratoryRequest = await LaboratoryRequest.findByPk(req.params.id);
        if (!laboratoryRequest) {
            return res.status(400).send("Laboratory Request is not found");
        }
        await laboratoryRequest.update(req.body);
        return res.send(laboratoryRequest);
    } catch (error) {
        return next(error);
    }
    }

exports.deleteLaboratoryRequest = async (req, res , next) => {
    try {
        const laboratoryRequest = await LaboratoryRequest.findByPk(req.params.id);
        if (!laboratoryRequest) {
            return res.status(400).send("Laboratory Request is not found");
        }
        await laboratoryRequest.destroy();
        return res.send(laboratoryRequest);
    } catch (error) {
        return next(error);
    }
    }

exports.deleteAllLaboratoryRequestOFChatRoom = async (req, res, next) => {
    try {
          await LaboratoryRequest.destroy({
            where: {
                chatRoomID: req.params.id
            }
        });
        return res.send("Laboratory Request are deleted");
    } catch (error) {
        return next(error);
    }
    }

 
exports.deleteAllLaboratoryRequest = async (req, res, next) => {
      console.log("deleteAllLaboratoryRequest");
        try {
          await LaboratoryRequest.destroy({
                where: {},
                truncate: false
            });
            return res.send("All Laboratory Request are deleted");
        } catch (error) {
            return next(error);
        }
}






 
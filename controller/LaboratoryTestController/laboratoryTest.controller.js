const LaboratoryTest = require("../../models/index").LaboratoryTest;
const Laboratory = require("../../models/index").Laboratory;

exports.createLaboratoryTest = async (req, res, next) => {
    try {
        const laboratoryTest = await LaboratoryTest.create(req.body);
        return res.send(laboratoryTest);
    } catch (error) {
        return next(error);
    }
    }
exports.getAllLaboratoryTest =async (req, res , next)  => {
    try {
        const laboratoryTest = await LaboratoryTest.findAll({include: [Laboratory,Laboratory]});
        return res.send(laboratoryTest);
    } catch (error) {
        return next(error);
    }
    }
exports.getOneLaboratoryTest = async (req, res , next)  => {
    try {
        const laborlaboratoryTestatory = await LaboratoryTest.findByPk(req.params.id,{include: [Laboratory,Laboratory]});
        if (!laborlaboratoryTestatory) {
             
            return res.status(400).send("Laboratory test is not found");
        }
        return res.send(laborlaboratoryTestatory);
    } catch (error) {
        return next(error);
    }
    }

exports.updateLaboratoryTest = async (req, res , next) => {
    try {
        const laboratoryTest = await LaboratoryTest.findByPk(req.params.id);
        if (!laboratoryTest) {
            return res.status(400).send("laboratory test is not found");
        }
        await laboratoryTest.update(req.body);
        return res.send(laboratoryTest);
    } catch (error) {
        return next(error);
    }
    }
exports.deleteLaboratoryTest = async (req, res , next) => {
    try {
        const laboratoryTest = await LaboratoryTest.findByPk(req.params.id);
        if (!laboratoryTest) {
            return res.status(400).send("laboratory test is not found");
        }
        await laboratoryTest.destroy();
        return res.send(laboratoryTest);
    } catch (error) {
        return next(error);
    }
    }

exports.deleteAllLaboratoryTest = async (req, res, next) => {
 
    try {
      await LaboratoryTest.destroy({
            where: {},
            truncate: false
        });
        return res.send("All laboratory tests are deleted");
    } catch (error) {
        return next(error);
    }
    }

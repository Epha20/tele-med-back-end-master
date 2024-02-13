const Laboratory = require("../../models/index").Laboratory;

exports.createLaboratory = async (req, res, next) => {
    try {
        const laboratory = await Laboratory.create(req.body);
        return res.send(laboratory);
    } catch (error) {
        return next(error);
    }
    }
exports.getAllLaboratory =async (req, res , next)  => {
    try {
        const laboratory = await Laboratory.findAll();
        return res.send(laboratory);
    } catch (error) {
        return next(error);
    }
    }
exports.getOneLaboratory = async (req, res , next)  => {
    try {
        const laboratory = await Laboratory.findByPk(req.params.id);
        if (!laboratory) {
             
            return res.status(400).send("laboratory is not found");
        }
        return res.send(laboratory);
    } catch (error) {
        return next(error);
    }
    }

exports.updateLaboratory = async (req, res , next) => {
    try {
        const laboratory = await Laboratory.findByPk(req.params.id);
        if (!laboratory) {
            return res.status(400).send("laboratory is not found");
        }
        await laboratory.update(req.body);
        return res.send(laboratory);
    } catch (error) {
        return next(error);
    }
    }
exports.deleteLaboratory = async (req, res , next) => {
    try {
        const laboratory = await Laboratory.findByPk(req.params.id);
        if (!laboratory) {
            return res.status(400).send("laboratory is not found");
        }
        await laboratory.destroy();
        return res.send(laboratory);
    } catch (error) {
        return next(error);
    }
    }

exports.deleteAllLaboratory = async (req, res, next) => {
 
    try {
        const laboratory = await Laboratory.destroy({
            where: {},
            truncate: false
        });
        return res.send("All laboratories                                                                    are deleted");
    } catch (error) {
        return next(error);
    }
    }

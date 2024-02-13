const LaboratoryReport = require("../../models/index").LaboratoryTest;
const Laboratory = require("../../models/index").Laboratory;

exports.createLaboratoryTest = async (req, res, next) => {
    try {
        const laboratoryReport = await LaboratoryReport.create(req.body);
        return res.send(laboratoryReport);
    } catch (error) {
        return next(error);
    }
    }
 
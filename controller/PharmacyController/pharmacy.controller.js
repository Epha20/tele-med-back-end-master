
const Pharmacies = require("../../models/index").Pharmacy;
const MedicalStaff = require("../../models/index").MedicalStaff
const User = require("../../models/index").User;

exports.createPharmacy = async (req, res, next) => {
    console.log(req.body);
    try {
        const pharmacy = await Pharmacies.create(req.body);
        return res.send(pharmacy);
    } catch (error) {
        console.log(error);
        return next(error);
    }
}
exports.getAllPharmacy = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.findAll({ include: [MedicalStaff] });
        return res.send(pharmacy);
    } catch (error) {
        return next(error);
    }
}
exports.getOnePharmacy = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.findOne({ where: { id: req.params.id }, include: [MedicalStaff] });
        if (!pharmacy) {

            return res.status(400).send("pharmacy is not found");
        }
        console.log(pharmacy);
        return res.send(pharmacy);
    } catch (error) {
        return next(error);
    }
}
exports.updatePharmacy = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.findByPk(req.params.id);
        if (!pharmacy) {
            return res.status(400).send("pharmacy is not found");
        }
        req.body.updatedAt = new Date();
        await pharmacy.update(req.body);
        return res.send(pharmacy);
    } catch (error) {
        return next(error);
    }
}

exports.deletePharmacy = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.findByPk(req.params.id);
        if (!pharmacy) {
            return res.status(400).send("pharmacy is not found");
        }
        await pharmacy.destroy();
        return res.send(pharmacy);
    } catch (error) {
        return next(error);
    }
}


exports.deleteAllPharmacy = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.destroy({ where: {}, truncate: true });
        return res.send(pharmacy);
    } catch (error) {
        return next(error);
    }

}


exports.getPharmacyByUserId = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.findOne({ where: { userId: req.params.id } });
        if (!pharmacy) {
            return res.status(400).send("pharmacy is not found");
        }
        return res.send(pharmacy);
    }
    catch (error) {
        return next(error);
    }
}

exports.getPharmaciesByMedicIdMedicineName = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.find({ where: { medicId: req.params.medicId, medicineName: req.params.medicineName }, });
        if (!pharmacy) {
            return res.status(400).send("pharmacy is not found");
        }
        return res.send(pharmacy);

    } catch (error) {
        return next(error);
    }
}

exports.uploadPharamcyLogoPhoto = async (req, res, next) => {

    try {
        console.log("req.file", req.file)
        let imagePath = req.file.path.replace(/\\/g, "/");
        const pharmacy = await Pharmacies.findByPk(req.params.id);
        console.log("pharmacy", pharmacy)
        if (!pharmacy) {
            return res.status(400).send("pharmacy is not found");
        }
        if (pharmacy.logo || pharmacy.logo != "") {
            const fs = require('fs');
            const path = './' + pharmacy.logo
            console.log("path", path)
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                //file removed
            })

        }
        req.body.logo = imagePath;
        await pharmacy.update(req.body);
        return res.send(pharmacy);
    } catch (error) {
        return next(error);
    }

}

exports.removePharamcyLogoPhoto = async (req, res, next) => {

    try {

        const pharmacy = await Pharmacies.findByPk(req.params.id);
        if (!pharmacy) {
            return res.status(400).send("pharmacy is not found");
        }
        if (pharmacy.logo || pharmacy.logo != "") {
            const fs = require('fs');
            const path = './' + pharmacy.logo
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log("file removed")
                //file removed
            })
        }
        req.body.logo = "";
        await pharmacy.update(req.body);
        return res.send(pharmacy);
    } catch (error) {
        next(error);
    }

}

exports.getAllAuthorizedPharmacies = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.findAll({ where: { isApproed: true } });
        return res.send(pharmacy);
    } catch (error) {
        next(error);
    }
}
exports.getallNotAuthorizedPharmacies = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.findAll({ where: { isApproed: false } });
        return res.send(pharmacy);
    } catch (error) {
        next(error);
    }
}

exports.getAllInprogressPharmacies = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacies.findAll({ where: { inProgress: true } });
        return res.send(pharmacy);
    } catch (error) {
        next(error);
    }
}






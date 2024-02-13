const Medicine = require("../../models/index").Medicine;
const Pharmacy = require("../../models/index").Pharmacy;
exports.getAllMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findAll();
        res.send(medicine);
    } catch (error) {
        return next(error);
    }
}

exports.createMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.create(req.body);
        res.send(medicine);
    } catch (error) {
        return next(error);
    }
}

exports.getOneMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findByPk(req.params.id);
        if (!medicine) {
            return res.status(400).send("Medicine not found");
        }
        res.send(medicine);
    } catch (error) {
        return next(error);
    }
}

exports.updateMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findByPk(req.params.id);
        if (!medicine) {
            return res.status(400).send("Medicine not found");
        }
        await medicine.update(req.body);
        res.send(medicine);
    } catch (error) {
        return next(error);
    }
}



exports.deleteMedicine = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const medicine = await Medicine.findByPk(req.params.id);

        if (!medicine) {
            return res.status(400).send("Medicine not found")
        }
        await medicine.destroy();
        res.send({ message: "Medicine deleted successfully" });
    } catch (error) {
        return next(error);
    }
}

exports.deleteAllMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.destroy({ where: {} });
        if (!medicine) {
            return res.status(400).send("Medicine not found");
        }
        res.send("Medicine deleted successfully");
    } catch (error) {
        return next(error);
    }
}

exports.getAllMedicineByPharmacy = async (req, res, next) => {
    try {
        const medicine = await Medicine.findAll({ where: { pharmacyId: req.params.id }, include: [Pharmacy] });
        if (!medicine || medicine.length == 0) {
            return res.status(400).send("Medicine not found");
        }

        res.send(medicine);
    } catch (error) {
        return next(error);
    }
}

exports.uploadMedicineImage = async (req, res, next) => {
    try {
        const medicine = await Medicine.findByPk(req.params.id);
        if (!medicine) {
            return res.status(400).send("Medicine not found");
        }
        if (medicine.image || medicine.image != null || medicine.image != "") {
            const fs = require('fs');
            const path = './' + medicine.image
            console.log("path", path)
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                //file removed
            })



        }
        let imagePath = req.file.path.replace(/\\/g, "/");
        medicine.image = imagePath;
        await medicine.save();
        res.send(medicine);
    } catch (error) {
        return next(error);
    }
}

exports.removeMedicineImage = async (req, res, next) => {
    try {
        const medicine = await Medicine.findByPk(req.params.id);
        if (!medicine) {
            return res.status(400).send("Medicine not found");
        }
         if (medicine.image || medicine.image != null || medicine.image != "") {
            const fs = require('fs');
            const path = './' + medicine.image
            console.log("path", path)
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                //file removed
            })



        }
        medicine.image = "";
        await medicine.save();
        res.send(medicine);
    } catch (error) {
        return next(error);
    }
}



// 
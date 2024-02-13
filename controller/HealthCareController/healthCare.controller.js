const HealthCare = require("../../models/index").HealthCare;
const User = require("../../models/index").User
const laboratory = require("../../models/index").laboratory;


exports.createHealthCare = async (req, res, next) => {
  try {
    const healthCare = await HealthCare.create(req.body);
    return res.send(healthCare);
  } catch (error) {
    return next(error);
  }
}
exports.getAllHealthCare = async (req, res, next) => {
  try {
    const healthCare = await HealthCare.findAll({ include: [User] });
    return res.send(healthCare);
  } catch (error) {
    return next(error);
  }
}
exports.getOneHealthCare = async (req, res, next) => {
  try {
    const healthCare = await HealthCare.findOne({ where: { id: req.params.id }, include: [User] });
    if (!healthCare) {

      return res.status(400).send("healthCare is not found");
    }
    console.log(healthCare);
    return res.send(healthCare);
  } catch (error) {
    return next(error);
  }
}
exports.updateHealthCare = async (req, res, next) => {
  try {
    const healthCare = await HealthCare.findByPk(req.params.id);
    if (!healthCare) {
      return res.status(400).send("healthCare is not found");
    }
    req.body.updatedAt = new Date();
    await healthCare.update(req.body);
    return res.send(healthCare);
  } catch (error) {
    return next(error);
  }
}
exports.deleteHealthCare = async (req, res, next) => {
  try {
    const healthCare = await HealthCare.findByPk(req.params.id);
    if (!healthCare) {
      return res.status(400).send("healthCare is not found");
    }
    await healthCare.destroy();
    return res.send(healthCare);
  } catch (error) {
    return next(error);
  }
}
exports.deleteAllHealthCare = async (req, res, next) => {
  console.log("deleteAllHealthCare");
  try {
    const healthCare = await HealthCare.destroy({ where: {}, truncate: false });
    return res.send("All HealthCares are deleted");
  } catch (error) {
    return next(error);
  }
}


exports.updateHealthcareBackgroundPhoto = async (req, res, next) => {

  try {

    let imagePath = req.file.path.replace(/\\/g, "/");
    const healthCare = await HealthCare.findOne({ where: { id: req.params.id } })

    if (!healthCare) {
      return res.status(401).send("HealthCare not found")
    }
    if (healthCare.backgroundImage || healthCare.backgroundImage != "") {
      const fs = require('fs');
      const path = './' + healthCare.backgroundImage
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        //file removed
      })

    }
    healthCare.backgroundImage = imagePath;
    await healthCare.save()


    return res.send(healthCare)

  } catch (error) {
    next(error)
  }
}

exports.deleteHealthcareBackgroundPhoto = async (req, res, next) => {
  try {
    const healthCare = await HealthCare.findOne({ where: { id: req.params.id } })

    if (!healthCare) {
      return res.status(401).send("HealthCare not found")
    }
    if (healthCare.backgroundImage || healthCare.backgroundImage != "") {
      const fs = require('fs');
      const path = './' + healthCare.backgroundImage
      console.log("path", path)
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        //file removed
      })

    }
    healthCare.backgroundImage = "";
    await healthCare.save()


    return res.send(healthCare)

  } catch (error) {
    next(error)
  }
}
exports.updateHealthcareLogoPhoto = async (req, res, next) => {

  try {
    console.log("req.file", req.file)

    let imagePath = req.file.path.replace(/\\/g, "/");
    console.log("imagePath", imagePath)
    const healthCare = await HealthCare.findOne({ where: { id: req.params.id } })

    if (!healthCare) {
      return res.status(401).send("HealthCare not found")
    }
    if (healthCare.logo || healthCare.logo != "") {
      const fs = require('fs');
      const path = './' + healthCare.logo
      console.log("path", path)
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        //file removed
      })

    }
    healthCare.logo = imagePath;
    await healthCare.save()


    return res.send(healthCare)

  } catch (error) {
    next(error)
  }
}

exports.deleteHealthcareLogoPhoto = async (req, res, next) => {
  try {
    const healthCare = await HealthCare.findOne({ where: { id: req.params.id } })

    if (!healthCare) {
      return res.status(401).send("HealthCare not found")
    }
    if (healthCare.logo || healthCare.logo != "") {
      const fs = require('fs');
      const path = './' + healthCare.logo
      console.log("path", path)
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        //file removed
      })

    }
    healthCare.logo = "";
    await healthCare.save()


    return res.send(healthCare)

  } catch (error) {
    next(error)
  }
}

exports.getAllAuthorizedHealthCare = async (req, res, next) => {
  try {
    const healthCare = await HealthCare.findAll({ where: { isApproved: true } });
    return res.send({"healthCareList":healthCare});
  } catch (error) {
    return next(error);
  }
}


exports.getAllUnAuthorizedHealthCare = async (req, res, next) => {
  try {
    const healthCare = await HealthCare.findAll({ where: { isApproved: false } });
    return res.send(healthCare);
  } catch (error) {
    return next(error);
  }
}


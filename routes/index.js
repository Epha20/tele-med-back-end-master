const express = require("express");
const userRoutes = require("./user.routes");
const patientRoutes = require("./patient.routes");
const medicalStaffRoutes = require("./medicalStaff.routes");
const chatRoom = require("./chatRoom.routes");
const message = require("./message.routes");
const healthCare = require("./healthCare.routes");
const laboratory = require("./laboratory.routes");
const laboratoryTest = require("./laboratoryTest.routes");
const laboratoryRequest = require("./laboratoryRequest.routes");
const pharmacy = require("./pharmacy.routes");
const medicine = require("./medicine.routes");
const router = express.Router();

router.use("/users", userRoutes);
router.use("/patients", patientRoutes);
router.use("/medicalStaff", medicalStaffRoutes);
router.use("/chatRoom", chatRoom);
router.use("/message", message);
router.use("/healthCare", healthCare);
router.use("/laboratory", laboratory);
router.use("/laboratoryTest", laboratoryTest);
router.use("/laboratoryRequest", laboratoryRequest);
router.use("/pharmacy", pharmacy);
router.use("/medicine", medicine);

module.exports = router;

// /api/users/register
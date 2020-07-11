const express = require("express");
const router = express.Router();

//accessing home controller
var patientController = require("../controllers/patient_controller");

//routes
router.post("/register", patientController.register);
router.post("/:id/create_report", patientController.createReport);
router.get("/:id/all_reports", patientController.allReports);

module.exports = router;

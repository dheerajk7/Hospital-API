const express = require("express");
const router = express.Router();
const passport = require("passport");

//accessing home controller
var patientController = require("../controllers/patient_controller");

//route for patient registration
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientController.register
);
//routes for creating report and getting reports
router.post(
  "/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  patientController.createReport
);
router.get(
  "/:id/all_reports",
  passport.authenticate("jwt", { session: false }),
  patientController.allReports
);

module.exports = router;

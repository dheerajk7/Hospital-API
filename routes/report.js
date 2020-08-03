const express = require("express");
const router = express.Router();
const passport = require("passport");

//accessing reports controller
var reportController = require("../controllers/report_controller");

//routes for reports

//route for getting report with report code
router.get("/get_report/:report_code", reportController.getReportWithCode);

//route for getting report with status
router.get("/:status", reportController.getReportsWithStatus);

module.exports = router;

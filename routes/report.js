const express = require("express");
const router = express.Router();

//accessing home controller
var reportController = require("../controllers/report_controller");

//routes
router.get("/:status", reportController.getReports);

module.exports = router;

const express = require("express");
const router = express.Router();

//routes
//using doctors routes
router.use("/doctors", require("./doctor"));
//using patients routes
router.use("/patients", require("./patient"));
//using reports routes
router.use("/reports", require("./report"));

module.exports = router;

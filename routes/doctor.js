const express = require("express");
const router = express.Router();

//accessing home controller
var doctorController = require("../controllers/doctor_controller");

//routes
router.post("/register", doctorController.register);
router.post("/login", doctorController.login);

module.exports = router;

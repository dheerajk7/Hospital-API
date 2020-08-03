const express = require("express");
const router = express.Router();

//accessing doctor controller
var doctorController = require("../controllers/doctor_controller");

//routes for doctor registration and login
router.post("/register", doctorController.register);
router.post("/login", doctorController.createSession);

module.exports = router;

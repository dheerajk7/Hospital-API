const Doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async function (request, response) {
  try {
    let phone = request.body.phone;
    //checking both password in form to be same
    if (request.body.password != request.body.confirm_password) {
      return response.status(403).json({
        success: false,
        message: "Password doesn't matched",
      });
    }
    //finding user if already exist
    let doctor = await Doctor.findOne({ phone: phone });
    if (!doctor) {
      let salt = 7;
      //encrypting password
      let passwordHash = await bcrypt.hash(request.body.password, salt);
      //creating user
      doctor = await Doctor.create({
        phone: phone,
        password: passwordHash,
        name: request.body.name,
      });
      return response.status(200).json({
        success: true,
        message: "Doctor registered Successfully",
      });
    } else {
      return response.status(402).json({
        success: false,
        message: "Doctor exist with these mobile number",
      });
    }
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.createSession = async function (request, response) {
  try {
    //finding user in db
    let doctor = await Doctor.findOne({ phone: request.body.phone });

    //checking if user exist or not
    if (!doctor) {
      return response.status(402).json({
        success: false,
        message: "Please Register Account not exist with these number",
      });
    }

    //compairing encrypted password with the input password
    bcrypt.compare(request.body.password, doctor.password, function (
      err,
      result
    ) {
      //if password doesn't matched
      if (result != true) {
        return response.status(402).json({
          success: false,
          message: "Invalid username or password",
        });
      }
      //if password matched returning user and token
      return response.status(200).json({
        data: {
          user: doctor.toObject(),
          //sending token for authentication
          token: jwt.sign(doctor.toObject(), "hospital", {
            expiresIn: 100000,
          }),
        },
        message: "Sign In successful,here is your token, keep it safe",
        success: true,
      });
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.register = async function (request, response) {
  try {
    let phone = request.body.phone;
    //finding user if already exist with the same phone number
    let patient = await Patient.findOne({ phone: phone });
    //if patient is not registered creating a patient
    if (!patient) {
      patient = await Patient.create({
        phone: phone,
        name: request.body.name,
      });
      return response.status(200).json({
        data: {
          patient: patient.toObject(),
        },
        success: true,
        message: "Patient registered Successfully",
      });
    } else {
      return response.status(200).json({
        data: {
          patient: patient.toObject(),
        },
        success: true,
        message: "Patient already exist with this mobile number",
      });
    }
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.createReport = async function (request, response) {
  try {
    let patient = await Patient.findByIdAndUpdate(request.params.id);
    //if patient doesn't exist
    if (!patient) {
      return response.status(402).json({
        success: false,
        message: "Patient not registered",
      });
    }

    //for matching input status with these status
    let statusValues = [
      "negative",
      "travelled-quarantine",
      "symptoms-quarantine",
      "positive-admit",
    ];
    let date = request.body.date;
    //getting report status
    let status = request.body.status.toLowerCase();
    //checking if status is four of these values or not
    if (!statusValues.includes(status)) {
      return response.status(402).json({
        message:
          "Status value is incorrect...values can be only Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit",
      });
    }
    let doctor_name = request.body.doctor_name;
    //setting the current date if date is not given by doctor for report creation
    if (date == undefined) {
      //if date is not defined then getting current date for report creation
      console.log("getting current date");
      let currentDate = new Date();
      date =
        currentDate.getDate() +
        "-" +
        currentDate.getMonth() +
        "-" +
        currentDate.getFullYear();
    }
    //setting doctor name to default logged in doctor if doctor name is not given
    if (doctor_name == undefined) {
      //if docter name is not defined for report then setting current doctor name who is logged as default doctor
      doctor_name = request.user.name;
    }

    //creating report
    let report = await Report.create({
      patient: request.params.id,
      created_by_doctor: request.user.name,
      referred_by: doctor_name,
      date: date,
      code: Date.now(),
      status: status.toLowerCase(),
    });

    //pushing report to user objects reports array
    patient.reports.push(report.id);
    patient.save();
    //sending report code
    return response.status(200).json({
      data: {
        report_code: report.code,
      },
      success: true,
      message: "Report created successfully",
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.allReports = async function (request, response) {
  //finding all reports of user
  let patient = await Patient.findById(request.params.id).populate("reports");
  let finalReports = [];
  //removing some information from report object
  for (report of patient.reports) {
    finalReports.push(report.toObject());
  }
  return response.status(200).json({
    data: {
      patient: patient.toObject(),
      reports: finalReports,
    },
    success: true,
    message: "All reports Received",
  });
};

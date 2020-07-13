const Report = require("../models/report");

module.exports.getReportsWithStatus = async function (request, response) {
  try {
    //getting current status
    let status = request.params.status.toLowerCase();
    let reports = await Report.find({ status: status }).populate("patient");
    let finalReports = [];
    //customizing report object
    for (let report of reports) {
      finalReports.push(report.toObject());
    }
    //sending report
    return response.status(200).json({
      data: {
        reports: finalReports,
      },
      message: `Report received with status ${status}`,
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.getReportWithCode = async function (request, response) {
  try {
    //finding report with current report code
    let report = await Report.find({
      code: request.params.report_code,
    }).populate("patient");
    if (!report) {
      return response.status(402).json({
        success: false,
        message: "Report not found",
      });
    }
    return response.status(200).json({
      data: {
        report: report[0].toObject(),
      },
      success: true,
      message: "Report Received",
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.register = function (request, response) {
  return response.status(200).json({
    message: "Patient Register Working",
  });
};

module.exports.createReport = function (request, response) {
  return response.status(200).json({
    data: {
      params: request.params.id,
    },
    message: "Create report working",
  });
};

module.exports.allReports = function (request, response) {
  return response.status(200).json({
    data: {
      params: request.params.id,
    },
    message: "All reports working",
  });
};

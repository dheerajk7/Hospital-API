module.exports.getReports = function (request, response) {
  return response.status(200).json({
    data: {
      params: request.params.status,
    },
    message: "Report Working",
  });
};

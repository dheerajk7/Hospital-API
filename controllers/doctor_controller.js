module.exports.register = function (request, response) {
  return response.status(200).json({
    message: "Doctor Register Working",
  });
};

module.exports.login = function (request, response) {
  return response.status(200).json({
    message: "Doctor Login Working",
  });
};

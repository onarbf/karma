class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {

  let { statusCode, message } = err;

  if (!statusCode) {statusCode = 404};
  if (!message) {message = 'Unknown error'};
  
  res.json({
    status: "error",
    statusCode,
    message
  });
};

module.exports = {
  ErrorHandler,
  handleError
}

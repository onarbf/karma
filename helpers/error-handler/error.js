// Main error handler object. It takes the status error and the error list, and this errors gets parsed
class ErrorHandler extends Error {
  constructor(statusCode, errors) {
    super();
    this.statusCode = statusCode || 404;

    // Basic difference to check if it's an error or an array of errors.
    if (Array.isArray(errors)) {
      this.errors = errors.map((err)=>{
        return {
          message: err.message || err.msg || 'Unknown error',
          param: err.param || 'Unknown param',
          location: err.location || 'Unknown location'
        }
      })

    }else{
      this.errors= [{
        message: errors.message || 'Unknown error'
      }]
    }

  }
}

// We can't create all errors, so this function handle all type of errors. It's the most important error function here, cause it helps us to separate the confidential and the public error.
const handleError = (err, res) => {;
let { statusCode, errors = [] } = err;

// errors.title is a field sent by mongoose errors
  if (!errors.title) {
    if (err.message) {
      //err.message is a typical common err structure, we create this to add error to the array
      res.json({
        status: "error",
        statusCode: statusCode || 404,
        errors : [{
          message: err.message || err.msg
        }],
      });
    }else{
      res.json({
        status: "error",
        statusCode: statusCode || 404,
        errors,
      });
    }

  }else{
    res.json({
      status: "error",
      statusCode: 404,
      errors: [{
        message: 'Bad mongoose input',
        errors: errors.title,
      }],
      err
    });
  }

};

module.exports = {
  ErrorHandler,
  handleError
}

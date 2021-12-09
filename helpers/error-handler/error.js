class ErrorHandler extends Error {
  constructor(statusCode, errors) {
    super();
    this.statusCode = statusCode || 404;

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

const handleError = (err, res) => {
let { statusCode, errors = [] } = err;
// errors.title is a field sent by mongoose errors
  if (!errors.title) {
    res.json({
      status: "error",
      statusCode: statusCode || 404,
      errors
    });
  }else{
    res.json({
      status: "error",
      statusCode: 404,
      errors: [{
        message: 'Bad mongoose input',
        errors: errors.title
      }]
    });

  }

};

module.exports = {
  ErrorHandler,
  handleError
}

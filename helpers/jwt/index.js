jsonwebtoken = require("jsonwebtoken");

// This function check if there is in some part of the request a JWT. After that, decrypt it and check if it's correct. In case of yes, it add the user info to the request. If not, it keeps as undefined
const validateJWT = function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.BCRYPT_SECRET, function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      console.log('working');
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
}

module.exports = {
  validateJWT
}

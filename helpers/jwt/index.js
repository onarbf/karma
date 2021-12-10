jsonwebtoken = require("jsonwebtoken");

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

const User = require("./userSchema.js")
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userValidation = require('./userValidations');
const {ErrorHandler} = require('../../helpers/error-handler/error');

const comparePassword = function(password, hash_password) {
    return bcrypt.compareSync(password, hash_password);
};
const createUser = async (req,res,next)=>{

		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
				throw new ErrorHandler(404,errors.array());
    }

    const newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    return await newUser.save();

}

const loginUser = async (req,res,next)=>{
		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {

			throw new ErrorHandler(404,errors.array());
    }

    const user = await User.findOne({ email: req.body.email })
    if (!user || !comparePassword(req.body.password,user.hash_password)) {
      throw new ErrorHandler(401,{ message: 'Authentication failed. Invalid user or password.' });
    }
    return { token: jwt.sign({ email: user.email, username: user.username, _id: user._id },process.env.BCRYPT_SECRET)};

}

const loginRequired = async function(req, res, next) {
    if (req.user) {
      next();
    } else {
      throw new ErrorHandler(401,{ message: 'Unauthorized user!!' });
    }
};
const profile = async function(req, res, next) {
  try {
    if (req.user) {
      res.send(req.user);
      next();
    }
    else {
      throw new ErrorHandler(401,{ message: 'Invalid token' });
    }
  } catch (err) {
    next(err,res)
  }
};


const validate = (method) => {
  switch (method) {
    case 'createUser': {
     return []
    }
  }
}

module.exports = {
  createUser,
  loginUser,
  loginRequired,
  profile,
  userValidation
}

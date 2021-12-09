const User = require("./userSchema.js")
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {ErrorHandler} = require('../../helpers/error-handler/error');

const comparePassword = function(password, hash_password) {
    return bcrypt.compareSync(password, hash_password);
};


const createUser = async (req,res,next)=>{
	try {

		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        // res.status(422).json({ errors: errors.array() });
				throw new ErrorHandler(404,errors.array());
      }
      const newUser = new User(req.body);
      newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
      return await newUser.save();

	} catch (err) {
    next(err, res)
	}

}

const loginUser = async (req,res,next)=>{
	try {

		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        // res.status(422).json({ errors: errors.array() });
				throw new ErrorHandler(404,errors.array());
      }

      const user = await User.findOne({ email: req.body.email })
      if (!user || !comparePassword(req.body.password,user.hash_password)) {
        console.log('wtf');
        throw new ErrorHandler(401,{ message: 'Authentication failed. Invalid user or password.' });
      }
      return { token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id },process.env.BCRYPT_SECRET)};
	} catch (err) {
    next(err, res)
	}
}

const loginRequired = async function(req, res, next) {
  try {
    if (req.user) {
      next();
    } else {
      throw new ErrorHandler(401,{ message: 'Unauthorized user!!' });
    }
  } catch (err) {
    next(err,res)
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
  profile
}

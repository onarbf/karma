const User = require("./userSchema.js")
const Token = require("../token/tokenSchema.js")
const { validationResult } = require('express-validator');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generator = require('generate-password');


const userValidation = require('./userValidations');
const {ErrorHandler} = require('../../helpers/error-handler/error');

//A function who open the connection to the email server and prepare the email
const {sendEmail} = require('../../helpers/mailer');
//the email content

//Checks that the user password is correct compared with its hash
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
    const user = await newUser.save();

    //creating the verification token
    const token = new Token({
      code: generator.generate({
	       length: 10,
	        numbers: true
      }),
      type: "userAuth",
      userId: user._id
    });

    //saving the token
    const savedToken = await token.save();
    //sending the confirmation email
    sendEmail(user.email,"Karma | Email confirmation",`Click here to confirm your Karma account: <a href="${process.env.SERVER_DOMAIN}/confirmUser?userId=${user._id}?token=${token.code}">Confirm your account</a>`);

    return await user;
}

const loginUser = async (req,res,next)=>{
		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {

			throw new ErrorHandler(404,errors.array());
    }

    const user = await User.findOne({ email: req.body.email })
    if (user.meta.accountPrivilege <= 1) {
      throw new ErrorHandler(401,{ message: 'Sorry, you need to confirm your account. Check your email!' });
    }
    if (!user || !comparePassword(req.body.password,user.hash_password)) {
      throw new ErrorHandler(401,{ message: 'Authentication failed. Invalid user or password.' });
    }
    return { token: jwt.sign({ email: user.email, username: user.username, _id: user._id },process.env.BCRYPT_SECRET)};

}

const confirmUser = async (req,res,next)=>{
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

  if (!errors.isEmpty()) {

    throw new ErrorHandler(404,errors.array());
  }
  const token = await Token.findOne({code: req.params.token});
  const user = await User.findOne({_id: req.params.userId});
  //This token shouldn't expire
  // if (token.meta.expirationAt < Date.now()) {
  //   throw new ErrorHandler(401,{ message: 'Sorry, but your token has expired. Recover your password to re-authenticate your account' });
  // }
  if (token.userId != user._id.toString()) {
    throw new ErrorHandler(401,{ message: "We couldn't confirm your account" });
  }
  await User.findOneAndUpdate({_id: user._id},{meta:{ accountPrivilege: 2}});
  await Token.deleteOne({_id: token._id});
  return true;
}

const loginRequired = async function(req, res, next) {
    if (req.user) {
      next();
    } else {
      throw new ErrorHandler(401,{ message: 'Unauthorized user!!' });
    }
};


const recoverPassword = async function(req, res, next) {
  console.log("req.body.email",req.body.email);
    const user = await User.findOne({email: req.body.email});
    console.log("user",user);
    const token = new Token({
      code: generator.generate({
	       length: 10,
	        numbers: true
      }),
      type: "recoverPassword",
      userId: user._id
    });
    console.log("token",token);
    //saving the token
    const savedToken = await token.save();

    sendEmail(user.email,"Karma | Recover your password",`Click here to recover your password: <a href="${process.env.SERVER_DOMAIN}/recoverPassword?userId=${user._id}&token=${token.code}">${process.env.SERVER_DOMAIN}/recoverPassword?userId=${user._id}&token=${token.code}</a>`);
    return true;
};

const recoverPassword2 = async function(req, res, next) {
  console.log('working');
  const token = await Token.findOne({code: req.params.token});
  const user = await User.findOne({_id: req.params.userId});

  if (token.meta.expirationAt < Date.now()) {
    throw new ErrorHandler(401,{ message: 'Sorry, but your token has expired. Recover your password to re-authenticate your account' });
  }

  if (token.userId != user._id.toString()) {
    throw new ErrorHandler(401,{ message: "Something went wrong on token validation" });
  }

  return true;
};



module.exports = {
  createUser,
  loginUser,
  confirmUser,
  loginRequired,
  recoverPassword,
  recoverPassword2,
  userValidation
}

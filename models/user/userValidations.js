var {check} = require('express-validator');
const {ErrorHandler} = require('../../helpers/error-handler/error');


const emailValidation = check('email').trim().escape().isEmail().withMessage('You need to provide an email');
const usernameValidation = check('username').trim().escape().isLength({min:4, max:32});

const passwordValidation = check('password').isLength({min:4}).withMessage('The password should have at least 6 characters')

//It compares the two passwords when it's needed
const passwordComparation =  check('password').isLength({min:5}).withMessage('The password should have at least 6 characters').custom(async (confirmPassword, {req}) => {
    const password = req.body.password2;
    if(password !== confirmPassword){
      console.log('error');
      throw new ErrorHandler(401,"Passwords dont match");
    }
  }).withMessage('The passwords do not match')


const userSigninValidation = [
  usernameValidation,
  emailValidation,
  passwordValidation,
  passwordComparation
]

const userLoginValidation = [
  emailValidation,
  passwordValidation
]

const recoverPasswordValidation = [
  emailValidation
]

const recoverPassword2Validation = [
  passwordComparation
]

module.exports = {
  userSigninValidation,
  userLoginValidation,
  recoverPasswordValidation,
  recoverPassword2Validation
}

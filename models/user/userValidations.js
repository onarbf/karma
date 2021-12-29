var {check} = require('express-validator');
const {ErrorHandler} = require('../../helpers/error-handler/error');


const emailValidation = check('email').trim().escape().isEmail().withMessage('You need to provide an email');
const usernameValidation = check('username').trim().escape().isLength({min:4, max:32});

const passwordValidation = check('password').isLength({min:1}).withMessage('The password field is empty');

//It compares the two passwords when it's needed
const passwordComparation =  check('password').isLength({min:1}).withMessage('The password field is empty').custom(async (confirmPassword, {req}) => {
    const password = req.body.password2;
    if(password !== confirmPassword){
      throw new ErrorHandler(401,"Passwords dont match");
    }
  })

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

module.exports = {
  userSigninValidation,
  userLoginValidation
}

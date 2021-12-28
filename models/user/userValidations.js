var {check} = require('express-validator');

const emailValidation = check('email').trim().escape().isLength({min:4, max:32}).withMessage('The email field is empty')

const userSigninValidation = [
  check('username').trim().escape().isLength({min:4, max:32}).isEmail().withMessage('username is not an email'),
  emailValidation,
  check('password').isLength({min:4, max:32}).custom(async (confirmPassword, {req}) => {
      const password = req.body.password2;
      if(password !== confirmPassword){
        throw new Error("Password dont match");
      }
    })
]

const userLoginValidation = [
  emailValidation,
  check('password').isLength({min:4, max:32}).withMessage('The password field is empty')
]

module.exports = {
  userSigninValidation,
  userLoginValidation
}

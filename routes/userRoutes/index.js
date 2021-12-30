var express = require('express');
var router = express.Router();
const _user = require('../../models/user');


// main route to create user. All the request has the same structure. All the code is clean. First, the sanitizers and validators middleware, abstracted to the _user object. Second, a try catch wrapper that holds the server logic.
router.post('/createUser/',_user.userValidation.userSigninValidation,
async (req, res, next) =>{
  try {
    const response = await _user.createUser(req,res,next);
    res.json({status: "success", response});
  } catch (err) {
    next(err);
  }
})


// same for the login functionality
router.post('/loginUser/',_user.userValidation.userLoginValidation,
async (req, res, next) =>{
  try {
    const response = await _user.loginUser(req,res,next);
    res.json({status: "success", response});
  } catch (err) {
    next(err);
  }
})

router.get('/confirmUser/:userId/:token',
async (req, res, next) =>{
  try {
    const response = await _user.confirmUser(req,res,next);
    res.json({status: "success", response});
  } catch (err) {
    next(err);
  }
})

router.post('/recoverPassword',_user.userValidation.recoverPasswordValidation,
async (req, res, next) =>{
  try {
    const response = await _user.recoverPassword(req,res,next);
    res.json({status: "success", response});
  } catch (err) {
    next(err);
  }
})

router.get('/recoverPassword2/:userId/:token',
async (req, res, next) =>{
  try {
    const response = await _user.recoverPassword2(req,res,next);
    res.json({status: "success", response});
  } catch (err) {
    next(err);
  }
})

router.post('/recoverPassword2/:userId/:token',_user.userValidation.recoverPassword2Validation,
async (req, res, next) =>{
  try {
    console.log("1234");
    const response = await _user.recoverPassword3(req,res,next);
    res.json({status: "success", response});
  } catch (err) {
    next(err);
  }
})

module.exports = router;

var express = require('express');
var router = express.Router();
const _user = require('../../models/user');


// main route to create user. All the request has the same structure. All the code is clean. First, the sanitizers and validators middleware, abstracted to the _user object. Second, a try catch wrapper that holds the server logic.
router.post('/createUser/',_user.userValidation.userSigninValidation,
async (req, res, next) =>{
  try {
    const newUser = await _user.createUser(req,res,next);
    res.json(newUser);

  } catch (err) {
    next(err);
  }
})


// same for the login functionality
router.post('/loginUser/',_user.userValidation.userLoginValidation,
async (req, res, next) =>{
  try {
    const loggedUser = await _user.loginUser(req,res,next);
    res.json(loggedUser);
  } catch (err) {
    next(err);
  }
})

router.get('/confirmUser/:userId/:token',
async (req, res, next) =>{
  try {
    const confirmedUser = await _user.confirmUser(req,res,next);
    res.json(confirmedUser);
  } catch (err) {
    next(err);
  }
})

router.post('/recoverPassword',
async (req, res, next) =>{
  try {
    console.log('hitted');
    const recoverPassword = await _user.recoverPassword(req,res,next);
    res.json(recoverPassword);
  } catch (err) {
    next(err);
  }
})

router.get('/recoverPassword2',
async (req, res, next) =>{
  try {
    console.log('hitted');
  } catch (err) {
    next(err);
  }
})

module.exports = router;

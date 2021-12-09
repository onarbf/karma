var express = require('express');
var router = express.Router();

const _user = require('../../models/user');

router.get('/createUser/', async (req, res, next) =>{
  console.log('req.body:',req.body);
  try {
    const newUser = await _user.createUser(req,res,next);

    res.json(newUser);
  } catch (err) {
    next(err, res);
  }
})

router.get('/loginUser/', async (req, res, next) =>{
  console.log('req.body:',req.body);

  try {
    const loggedUser = await _user.loginUser(req,res,next);

    res.json(loggedUser);
  } catch (err) {
    next(err, res);
  }
})

module.exports = router;

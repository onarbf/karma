var express = require('express');
const path = require('path');

var userRoutes = require('./userRoutes');

var router = express.Router();

// The main routes.
router.use('/user',userRoutes);

//Just a test route
router.get('/hi', async (req, res, next) =>{
  res.json({status:"success",response: 'hi!'});
})


module.exports = router;

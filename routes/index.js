var express = require('express');
const path = require('path');



var userRoutes = require('./userRoutes');
var todoRoutes = require('./todoRoutes');

var router = express.Router();

// The main routes.
router.use('/user',userRoutes);
router.use('/todo',todoRoutes)


//Just a test route
router.get('/hi', async (req, res, next) =>{
  res.json({response: 'hi!'});
})

//All the rest of domains go to the react page.
router.get('*', (req,res,next) => {
  try {
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
  } catch (err) {
    next(err)
  }
});



module.exports = router;

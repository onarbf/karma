var express = require('express');
const path = require('path');

var userRoutes = require('./userRoutes');
var todoRoutes = require('./todoRoutes');

var router = express.Router();

router.use('/user',userRoutes);
router.use('/todo',todoRoutes)

router.get('/hi', async (req, res, next) =>{
  res.send('hi!');
})

router.get('*', (req,res,next) => {
  try {
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
  } catch (err) {
    next(err, res)
  }
});



module.exports = router;

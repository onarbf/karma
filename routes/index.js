var express = require('express');
const path = require('path');

var userRoutes = require('./userRoutes');
var todoRoutes = require('./todoRoutes');

var router = express.Router();



router.use('/user',userRoutes);
router.use('/todo',todoRoutes)


router.get('/',async (req, res, next) =>{

  try {
    res.json(req.user);
    // res.json({ message: "Welcome to bezkoder application." });
  } catch (err) {
    next(err, res)

  }

})

router.get('*', (req,res,next) => {
  try {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  } catch (err) {
    next(err, res)
  }
});



module.exports = router;

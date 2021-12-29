var express = require('express');
var router = express.Router();

const _todo = require('../../models/todo');


router.get('/getLastTodo',async (req, res, next) =>{
  console.log('works');
  try {
    const todo = await _todo.getLastCreatedTodo();
    res.json(todo);

  } catch (err) {
    next(err)
  }

})

router.get('/createTodo/:title?',_todo.validate('createTodo'), async (req, res, next) =>{
  try {
    const newTodo = await _todo.createTodo(req,res,next);
    res.json(newTodo)
  } catch (err) {
    next(err);
  }
})

module.exports = router;

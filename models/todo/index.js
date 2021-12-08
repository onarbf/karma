const Todo = require("./todoSchema.js")
const { body, param, validationResult } = require('express-validator');
const {ErrorHandler} = require('../../helpers/error-handler/error');

const createTodo = async (req,res,next)=>{
	try {

		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
		const {title} = req.params
		const todo = await new Todo({
			title
		})
		return await todo.save()

	} catch (err) {
		next(err)
	}

}

const getLastCreatedTodo = (async ()=>{
	return await Todo.findOne().sort('-meta.createdAt');
})

validate = (method) => {
  switch (method) {
    case 'createTodo': {
     return [
        param('title', 'Partnerid field must be 5 character long ').isLength({ min: 5, max:5 })
       ]
    }
  }
}


module.exports = {
  createTodo,
	getLastCreatedTodo,
	validate
}

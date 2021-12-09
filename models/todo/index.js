const Todo = require("./todoSchema.js")
const { body, param, validationResult } = require('express-validator');
const {ErrorHandler} = require('../../helpers/error-handler/error');

const createTodo = async (req,res,next)=>{
	try {

		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        // res.status(422).json({ errors: errors.array() });
				throw new ErrorHandler(404,errors.array());
        return;
      }
		const {title} = req.params
		const todo = await new Todo({
			title
		})
		return await todo.save()

	} catch (err) {
		console.log('working');
		next(err, res)
	}

}

const getLastCreatedTodo = (async ()=>{
	return await Todo.findOne().sort('-meta.createdAt');
})

validate = (method) => {
  switch (method) {
    case 'createTodo': {
     return [
        param('title', 'Partnerid field must be 5 character long ').isLength({ min: 2, max:200 }),
				param('title', 'The title is empty').exists(),
				//SANITIZERS
				param('title').trim().escape()
       ]
    }
  }
}

module.exports = {
  createTodo,
	getLastCreatedTodo,
	validate
}

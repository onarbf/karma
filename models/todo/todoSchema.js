let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoSchema = new Schema({
  title: {
    type: String,
    required: true
    // validate: [(val)=> val !== 'test','Validation failed']
  },
  meta: {
    createdAt:{
      type: Date,
      default: new Date(),
      required: true
    }
  }
})

module.exports =  mongoose.model('todos', todoSchema);

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tokenSchema = new Schema({
  code: {
    type: String,
    trim: true,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  userId: {
    type: String
  },
  meta:{
    createdAt: {
      type: Date,
      default: Date.now
    },
    expirationAt:{
      type: Date,
      //It expires after 1 day
      default: () => Date.now() + (1*24*60*60*1000)
    },
    isConsumed:{
      type: Boolean,
      default: false
    }
  }
});

module.exports =  mongoose.model('token', tokenSchema);

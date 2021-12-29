let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    
    required: true
  },
  hash_password: {
    type: String
  },
  meta:{
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    //the type of account. 1 is registered, but not email confirmed
    accountPrivilege: {
      type: Number,
      required: true,
      default: 1
    }
  }
});

module.exports =  mongoose.model('user', userSchema);

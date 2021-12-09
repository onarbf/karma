// app.js
require('dotenv').config()

const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const helmet = require('helmet');
const db = require('./models/db');
const { validationResult } = require('express-validator');
const {ErrorHandler, handleError} = require('./helpers/error-handler/error');
const _todo = require('./models/todo');
// Create Express app
const server = express()

// Basic security
// server.use(helmet());

const port = process.env.DEV_PORT || process.env.PORT

server.get('/',async (req, res, next) =>{
  try {
    res.send('index')

  } catch (err) {
    next(err, res)

  }
})

server.get('/getLastTodo',async (req, res, next) =>{

  try {
    const todo = await _todo.getLastCreatedTodo();
    res.json(todo);

  } catch (err) {
    next(err, res)
  }

})

server.get('/createTodo/:title?',_todo.validate('createTodo'), async (req, res, next) =>{
  try {
    const newTodo = await _todo.createTodo(req,res,next);
    res.json(newTodo)
  } catch (err) {
    next(err, res);
  }
})

server.get('*', (req,res,next) => {
  try {
    res.redirect('/')
  } catch (err) {
    next(err, res)
  }
});

server.use((err, req, res, next) => {
  handleError(err, res);
});

// Start the Express server
server.listen(port, () => console.log(`Server running on port ${port} and ${process.env.NODE_ENV} environment`))

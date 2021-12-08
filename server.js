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
// A sample route

server.get('/getTodo',async (req, res, next) =>{
  try {
    const todo = await _todo.getLastCreatedTodo();
    res.json(todo);
  } catch (e) {
    throw new ErrorHandler(500,e.message)
  }
})

server.get('/createTodo/:title?',_todo.validate('createTodo'), async (req, res, next) =>{
  try {
    const newTodo = await _todo.createTodo(req,res,next);
    res.json(newTodo)
  } catch (err) {
    next(err  ,res);
  }
})

server.get('/error', (req, res) => {
  throw new ErrorHandler(500, 'Internal server error');
})

server.use((err, req, res, next) => {
  handleError(err, res);
});

// Start the Express server
server.listen(port, () => console.log(`Server running on port ${port}`))

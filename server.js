// app.js
require('dotenv').config()

const express = require('express');
const helmet = require('helmet');
const db = require('./models/db');
const { validationResult } = require('express-validator');
const {ErrorHandler, handleError} = require('./helpers/error-handler/error');
const bodyParser = require("body-parser");
const cors = require("cors");

// Create Express app
const server = express()
//  ENV variables
const port = process.env.DEV_PORT || process.env.PORT
const domain = process.env.DEV_DOMAIN || process.env.DOMAIN
const corsOptions = {origin: `${domain}:${port}`};

const routes = require('./routes');

// Basic security
server.use(helmet());

server.use(cors(corsOptions));

// parse requests of content-type - application/json
server.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

//router handler
server.use('/',routes)

server.use((err, req, res, next) => {
  handleError(err, res);
});

// Start the Express server
server.listen(port, () => console.log(`Server running on port ${port} and ${process.env.NODE_ENV} environment`))

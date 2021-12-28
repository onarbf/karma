// app.js
require('dotenv').config()

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const db = require('./models/db');
const { validationResult } = require('express-validator');

const {ErrorHandler, handleError} = require('./helpers/error-handler/error');
const {validateJWT} = require('./helpers/jwt');
const { rateLimiterUsingThirdParty } =  require('./helpers/rateLimiter');

const bodyParser = require("body-parser");
const cors = require("cors");

// Create Express app
const server = express()

//  ENV variables
const port = process.env.DEV_PORT || process.env.PORT
const domain = process.env.DEV_DOMAIN || process.env.DOMAIN
// const corsOptions = {origin: `${domain}:${port}`};

const routes = require('./routes');

// basic security. It doesn't work properly with the same server architecture, so it's disabled.
// server.use(helmet());

// parse requests of content-type - application/json
server.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// it defines the public folder, where are all the static files and the react build
server.use(express.static(path.join(__dirname,'client/build')));

//rate limiter. Is not configured yet, just by default
server.use(rateLimiterUsingThirdParty);

// It takes all the request and check if there is some JSON web token. The root of the auth. Read more inside of the folder.
server.use(validateJWT);

//router handler
server.use('/api',routes)

//error handler.
server.use((err, req, res, next) => {
  handleError(err, res);
});

// Start the Express server
server.listen(port, () => console.log(`Server running on port ${port} and ${process.env.NODE_ENV} environment`))

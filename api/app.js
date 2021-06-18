'use strict';
// load modules
const express = require('express');
const morgan = require('morgan');
const routesUser = require('./routes/users');
const routesCourses = require('./routes/courses');

const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

var cors = require('cors');

// create the Express app
const app = express();
app.use(cors());
// Setup request body JSON parsing.
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));
var sequelize = require('./models').sequelize;

//test database connection
(async () => {
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log('Connection to databse established.');
  } catch (error) {
    console.error('Connection to database failed: ', error);
  }
})();

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});


//Add routes
app.use('/api', routesUser);
app.use('/api', routesCourses);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

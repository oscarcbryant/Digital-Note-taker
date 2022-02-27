const express = require('express');

// Import our modular routers for /tips and /feedback
const indexRouter = require('./index');

const app = express();

app.use('/index', indexRouter);

module.exports = app;

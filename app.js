const express = require('express');
const dotenv = require("dotenv");
const Bootstrap = require('./core/Boostrap');

const app = express();
dotenv.config();

Bootstrap.viewEngine(app);
Bootstrap.registerMiddleware(app);
Bootstrap.registerRoute(app);
Bootstrap.registerHandler(app);

module.exports = app;

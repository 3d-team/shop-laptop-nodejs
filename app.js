const express = require('express');
const Bootstrap = require('./core/Boostrap');

const app = express();

Bootstrap.viewEngine(app);
Bootstrap.registerMiddleware(app);
Bootstrap.registerRoute(app);
Bootstrap.registerHandler(app);

module.exports = app;

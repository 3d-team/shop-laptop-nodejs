const express = require('express');
const Bootstrap = require('./core/Boostrap');

const app = express();

Bootstrap.viewEngine(app);
Bootstrap.middleware(app);
Bootstrap.routing(app);

module.exports = app;

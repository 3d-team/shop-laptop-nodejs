const express = require('express');
const dotenv = require("dotenv");
const Bootstrap = require('./core/Boostrap');

const app = express();
dotenv.config();

app.locals.Cart = {
    number: 0,
    total_unit: 0,
    title: "cart",
    items: new Map()
}

Bootstrap.viewEngine(app);
Bootstrap.registerMiddleware(app);
Bootstrap.registerRoute(app);
Bootstrap.registerHandler(app);

module.exports = app;

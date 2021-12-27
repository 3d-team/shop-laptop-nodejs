const dotenv = require("dotenv");
const Context = require("./core/Context");
const Bootstrap = require('./core/Boostrap');

dotenv.config();

/**
| -----------------------------------
| Configure IoC container.
| -----------------------------------
| 
| Binding all providers that declared in config/app.js.
| Consists of a Express application instance.
|
**/
const context = Context.configure();
const kernel = context.make('express');

/**
| -----------------------------------
| Booting all required components of Express app.
| -----------------------------------
| 
| This bootstraps the application and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
**/
const application = new Bootstrap(kernel);
application.booting();


/*
|--------------------------------------------------------------------------
| Start the application.
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/
module.exports = application.start();

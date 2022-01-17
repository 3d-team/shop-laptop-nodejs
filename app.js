const dotenv = require("dotenv");
const Context = require("./core/Context");
const Bootstrap = require('./core/Boostrap');
const providers = require("./config/app");

dotenv.config();

/**
| -----------------------------------
| Configure IoC container.
| -----------------------------------
| 
| We need to bind some important dependencies into the context so
| we will be able to resolve them when needed.
|
| The kernel is a Express application instance, serve the
| incoming requests to this application from the web.
|
**/
const context = Context.configure(providers);
const kernel = context.make('express');


/**
| -----------------------------------
| Booting all required components.
| -----------------------------------
| 
| This bootstraps the application and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
**/
const application = new Bootstrap(kernel);
application.booting();


/**
|--------------------------------------------------------------------------
| Start the application.
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
**/
module.exports = application.start();

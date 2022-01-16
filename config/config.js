const path = require('path');

const CONFIG_DIR = path.join(__dirname);
const CORE_DIR = path.join(__dirname, "../core");
const MODULE_DIR = path.join(__dirname, "../modules");
const ROUTE_DIR = path.join(__dirname, "../routes");
const VIEW_DIR = path.join(__dirname, "../views");
const PUBLIC_DIR = path.join(__dirname, "../public");
const SERVICE_DIR = path.join(__dirname, "../services");
const MIDDLEWARE_DIR = path.join(__dirname, "../middlewares");
const REPOSITORY_DIR = path.join(__dirname, "../repository");
const UPLOAD_DIR = path.join(__dirname, "../public/uploads");

module.exports = {
	APP_KEY: String(process.env.APP_KEY),
	DB_PORT: process.env.DB_PORT,
	DB_DATABASE: process.env.DB_DATABASE,
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	CONFIG_DIR,
	CORE_DIR,
	MODULE_DIR,
	ROUTE_DIR,
	VIEW_DIR,
	PUBLIC_DIR,
	SERVICE_DIR,
	MIDDLEWARE_DIR,
	REPOSITORY_DIR,
	UPLOAD_DIR
}
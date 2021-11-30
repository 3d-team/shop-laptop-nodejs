const path = require('path');

const configDirname = path.join(__dirname);
const moduleDirname = path.join(__dirname, "../modules");
const routeDirname = path.join(__dirname, "../routes");
const viewDirname = path.join(__dirname, "../views");

module.exports = {
	configDirname,
	moduleDirname,
	routeDirname,
	viewDirname
}
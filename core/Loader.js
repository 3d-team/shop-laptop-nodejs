require('./../config/config');

const path = require('path');
const fs = require('fs');

class Loader {

	constructor() {}

	static loadController(module, type) {
		return require("../modules/" + module + "/controllers/" + type + "Controller");
	}

	static loadModel(module) {
		var model;
		fs.readdirSync(path.join(config.moduleDirname, module, 'model')).forEach(function(file){
			model = require(path.join(config.moduleDirname, moduleName, 'model', file));
		});	
	  	return model;
	}

	static loadConfig(config) {
		var config;
	    config = require(path.join(__dirname, config));
	    return config;
	}
}

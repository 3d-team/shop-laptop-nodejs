const path = require('path');
const fs = require('fs');

const config = require('./../config/config');
const Utils = require('./Utils');

/**
 * Loader
 * 
 * Function: Loading component (Controller, Model, ...).
 **/
class Loader {

	static controller(moduleName, type = 'Default') {
		const module = moduleName.toLowerCase();
		const controller = Utils.capitalize(type).concat('Controller');
		const controllerPath = path.join(config.MODULE_DIR, module, 'controllers');

		return require(path.join(controllerPath, controller));
	}

	static model(model) {
		const modelName = Utils.capitalize(model).concat('Model.js');

		let existedModel;
		fs.readdirSync(config.MODULE_DIR).forEach((module) => {
			const modelDirectory = path.join(config.MODULE_DIR, module, "models");

			if (fs.existsSync(modelDirectory)) {
				fs.readdirSync(modelDirectory).forEach((file) => {	
					if (modelName === file) {
						existedModel = require(path.join(modelDirectory, file));
					};
				});
			};
		});
		return existedModel;
	}
}

module.exports = Loader;

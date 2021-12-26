const path = require('path');
const fs = require('fs');

const config = require('./../config/config');
const Utils = require('./Utils');

/**
 * @class Loader
 * @brief Loading another component by it's name (Controller, Model, ...).
 * @brief Apply Facade pattern
 **/
class Loader {

	/**
	 * @brief Loading specific controller in any module
	 * @param moduleName Which module needed
	 * @param type admin, default
	 * @return AdminController, DefaultController
	**/
	static controller(moduleName, type = 'Default') {
		const module = moduleName.toLowerCase();
		const controller = Utils.capitalize(type).concat('Controller');
		const controllerPath = path.join(config.MODULE_DIR, module, 'controllers');

		return require(path.join(controllerPath, controller));
	}

	/**
	 * @brief Scanning all available models of modules.
	 * @param model Name of specific model
	 * @return XXXModel
	**/
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

	/**
	 * @brief Loading specific custom library in /core folder.
	 * @param library Name of custom library. Can find it in /core folder.
	 * @return Any custom library.
	**/
	static core(library) {
		const libraryName = Utils.capitalize(library);
		return require(path.join(config.CORE_DIR, libraryName));
	}
}

module.exports = Loader;

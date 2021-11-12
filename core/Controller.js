class Controller {
	constructor(module, layout) {
		this.module = module;
		this.layout = layout;
		this.view = module + "/views/" + layout;
	}
}

module.exports = Controller;
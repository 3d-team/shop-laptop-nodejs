const menu = require('../../common_model/MenuContent');
const TagsModel = require("./../../common_model/TagsModel");

class DefaultController {

	async index(req, res) {
		let productPerTag = [];

		const cache = req.app.get('context').make('cache');
		if (cache.has("productPerTag")) {
			productPerTag = cache.get("productPerTag");
		} else {
			const productService = req.app.get('context').make('productService');
			productPerTag = await productService.getProductsPerTag(req);
			cache.set("productPerTag", productPerTag);
		}

		res.render('index', {
			menuContent: menu.getContentHomeMenuItem(),
			productPerTag: productPerTag
		});
	}

	about(req, res) {

		res.render('aboutUs', {
			content: "Default: index",
			menuContent: menu.getContentAboutMenuItem()
		});
	}

	contact(req, res) {

		res.render('contactUs', {
			content: "Default: index",
			menuContent: menu.getContentContactMenuItem()
		});
	}
}

module.exports = new DefaultController();
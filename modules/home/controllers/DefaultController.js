const menu = require('../../common_model/MenuContent');
const TagsModel = require("./../../common_model/TagsModel");

class DefaultController {
	
	async index(req, res) {
		const tags = await TagsModel.findAll();

		const productRepository = req.app.get('context').make('productRepository');
		
		let productPerTag = [];
		for (const tag of tags) {
			const products = await productRepository.findByTagId(tag.id);
			productPerTag.push({tag: tag.name, products: products});
		}
		console.log(productPerTag);

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
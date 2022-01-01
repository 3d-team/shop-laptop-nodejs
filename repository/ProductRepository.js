const ProductModel = require("./../modules/product/models/ProductModel");

class ProductRepository {
	async findById(productId) {
		const product = await ProductModel.findOne({where: {id: productId}});
		return product;
	}
}

module.exports = ProductRepository;
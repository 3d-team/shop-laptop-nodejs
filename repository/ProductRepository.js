const ProductModel = require("./../modules/product/models/ProductModel");

class ProductRepository {
	async findById(productId) {
		const product = await ProductModel.findOne({where: {id: productId}});
		return product;
	}

	async findAll(condition = {}) {
		const query = Object.assign(condition, {
			order: [['id', 'DESC']]
		});

		const products = await ProductModel.findAll(query);
		return products;
	}

	async createProduct(data) {
		const product = await ProductModel.create(data);
		return product;
	}

	async updateById(productId, data) {
		const condition = {
			where: {id: parseInt(productId) }
		};
		await ProductModel.update(data, condition);
	}

	async deleteById(productId) {
		const condition = {
			where: {id: parseInt(productId) }
		};
		await ProductModel.destroy(condition);
	}
}

module.exports = ProductRepository;
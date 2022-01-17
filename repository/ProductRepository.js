const ProductModel = require("./../modules/product/models/ProductModel");
const ProductTagModel = require("./../modules/product/models/ProductTagModel");

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

	async findByTagId(tagId) {
		const condition = {
			where: {
				tag_id: tagId
			}
		}
		const productTags = await ProductTagModel.findAll(condition);

		let products = [];
		for (const productTag of productTags) {
			const productId = {
				where: {
					id: productTag.product_id
				}
			}
			const product = await ProductModel.findOne(productId);
			products.push(product);
		}

		return products;
	}
}

module.exports = ProductRepository;
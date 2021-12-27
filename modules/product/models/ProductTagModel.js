const Sequelize = require('sequelize');
const sequelize = require('./../../../config/database');

const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');
const TagsModel = require('../../common_model/TagsModel');

const ProductTagModel = sequelize.define('ProductTag', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	product_id: {
		type: Sequelize.INTEGER,
		references:{
			model: ProductModel,
			key: 'id'
		}
	},
	tag_id: {
		type: Sequelize.INTEGER,
		references:{
			model: TagsModel,
			key: 'id'
		}
	}
}, {
	tableName: "product_tag",
    createdAt: false,
	updatedAt: false
});

module.exports = ProductTagModel;
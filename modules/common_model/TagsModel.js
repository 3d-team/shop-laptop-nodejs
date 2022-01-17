const Sequelize = require('sequelize');
const sequelize = require('./../../config/database');

const Loader = require("./../../core/Loader");

const TagsModel = sequelize.define('Tags', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE
}, {
	tableName: "tags",
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = TagsModel;
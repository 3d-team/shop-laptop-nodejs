const Sequelize = require('sequelize');
const sequelize = require('./../../../config/database');

const CommentModel = sequelize.define('Comment', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	content: Sequelize.STRING,
	created_at: Sequelize.DATE,
    product_id: Sequelize.INTEGER
}, {
	tableName: "comments",
	createdAt: 'created_at',
	updatedAt: false
});

module.exports = CommentModel;
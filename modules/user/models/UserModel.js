const Sequelize = require('sequelize');
const sequelize = require('./../../../config/database');

const UserModel = sequelize.define('User', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	username: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING,
	address: Sequelize.STRING,
	phone: Sequelize.STRING,
	avatar: Sequelize.STRING,
	sex: Sequelize.INTEGER,
	admin: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	status: Sequelize.INTEGER,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE
}, {
	tableName: "users",
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deleteAt: 'delete_at'
});


module.exports = UserModel;
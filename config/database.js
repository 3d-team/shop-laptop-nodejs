const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop-laptop', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;
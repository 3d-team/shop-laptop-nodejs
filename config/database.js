const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize('1wgEqBN44u', '1wgEqBN44u', 'nWLLjcfGkm', {
	host: 'remotemysql.com',
	dialect: 'mysql',
	port: 3306
});

sequelize.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

module.exports = sequelize;
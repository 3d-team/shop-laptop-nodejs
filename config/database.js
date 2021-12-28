const Sequelize = require('sequelize');
const config = require('./config');

/**
*--------------------------------------------------------------------------
* 	Database connections.
*--------------------------------------------------------------------------
*
* Here are the database connections setup for application.
*
* @brief MySQL ORM for Nodejs.
* @brief In this project, we use free database from remotemysql.com
* @return Connection to MySQL Server.
* 
**/

const sequelize = new Sequelize('1wgEqBN44u', '1wgEqBN44u', 'nWLLjcfGkm', {
	host: 'remotemysql.com',
	dialect: 'mysql',
	port: 3306
});

/** 
* @brief Checking status of connection 
*	
* */
sequelize.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});


module.exports = sequelize;
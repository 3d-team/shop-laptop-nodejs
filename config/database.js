const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql6453825', 'sql6453825', 'rUMEMYE61g', {
	host: 'sql6.freemysqlhosting.net',
	dialect: 'mysql',
	port: 3306
});

module.exports = sequelize;
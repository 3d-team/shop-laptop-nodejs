const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql6453825', 'sql6453825', 'rUMEMYE61g', {
	host: 'sql6.freemysqlhosting.net',
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
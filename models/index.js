const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);

const modelDefiners = [
    require('./User.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;

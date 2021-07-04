const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('user', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
			validate: {
				// We require usernames to have length of at least 3, and
				// only use letters, numbers and underscores.
				is: /^\w{3,}$/
			}
		},
        email: {
            allowNull: false, 
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            } 
        },
        password: DataTypes.STRING,
	});

    User.beforeCreate(user => {
        bcrypt.hash(User.password, 10, (err, hash) => {
          return User.update({
            password: hash
          });
        });
      });
};
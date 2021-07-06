const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
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

	  return User;
};
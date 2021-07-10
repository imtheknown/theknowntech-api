const asyncHandler = require('../middleware/async.middleware');
const encryption = require("../utils/encryption.utils");
const { User } = require('../models');
const { Op } = require('sequelize');


exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.findAndCountAll({attributes: ['username', 'email']});
    res.status(200).json({ success: true, count: users.count, data: users.rows });
});


   exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.params.id }, attributes: ['username', 'email'] });
    res.status(200).json({ success: true, data: user });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  let registerCredentials = req.body;
  User.findOne({ where: {
    [Op.or]: [
      {email: registerCredentials.email},
      {username: registerCredentials.email}
    ]
  }}).then(user => {
    let errorMessage = '';
    if(user){
      console.log(user.username, user.email);
    if(user.username === registerCredentials.username){
      errorMessage = 'User with the username already exists';
    }else{
      errorMessage = 'User with the email already exists'; 
    }
  }
    if(errorMessage){
      res.status(404).json({ success: false, data: {message: errorMessage}});
      return;
    }else{
      const salt = encryption.generateSalt();
      const passwordHash = encryption.hashPassword(registerCredentials.password, salt);
      const userObject = {
          email: registerCredentials.email,
          password: passwordHash,
          username: registerCredentials.username,
          salt: salt
      };

      User.create(userObject).then((user, error) => {
        if(error){
          res.status(404).json({ success: false, data: {message: errorMessage}});
          return;
        }
        res.status(201).json({ success: true, data: user });
      })
    }
  })
});

exports.login = asyncHandler(async (req, res, next) => {
  const loginCredentials = req.body;
  User.findOne({where:{username: loginCredentials.username}}).then(user => {
    if (!user ||!user.authenticate(loginCredentials.password)) {
      loginArgs.error = 'Invalid username or password';
      res.status(404).json({ success: false, data: {message: errorMessage}});
      return;
  }
  //Todo implement access token and redirection
  res.status(200).json({ success: true, data: user });
  })
})

const asyncHandler = require("../middleware/async.middleware");
const encryption = require("../utils/encryption.utils");
const { User } = require("../models");
const { Op } = require("sequelize");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAndCountAll({
    attributes: ["username", "email"],
  });
  res.status(200).json({ success: true, count: users.count, data: users.rows });
});



exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["username", "email"],
  });
  res.status(200).json({ success: true, data: user });
});



exports.createUser = asyncHandler(async (req, res, next) => {
  let registerCredentials = req.body;

  //To search for existing username and email
  User.findOne({
    where: {
      [Op.or]: [
        { email: registerCredentials.email },
        { username: registerCredentials.email },
      ],
    },
  }).then((user) => {
    let errorMessage = "";
    if (user) {
      if (user.username === registerCredentials.username) {
        errorMessage = "User with the username already exists";
      } else {
        errorMessage = "User with the email already exists";
      }
    }
    if (errorMessage) {
      res.status(404).json({ success: false, data: { message: errorMessage } });
      return;
    }
  });

  //For password encryption
  const salt = encryption.generateSalt();
  const passwordHash = encryption.hashPassword(registerCredentials.password, salt);

  //Create a new user and save the user
  const newUser = User.build();
  newUser.username = req.sanitize('username').escape();
  newUser.email = req.sanitize('email').escape();
  newUser.password = passwordHash;

  newUser.save()
		.then(function(instance){
			console.log(instance);
			res.status(200).json(instance);
		})
		.catch(function(error){
			res.status(500).json(error);
		})
});

exports.deleteUser = asyncHandler(async(req,res,next) =>{
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(deletedUser){
    res.status(200).json(deletedUser);
  })
  .catch(function(error){
    res.status(500).json(error);
  });
})


exports.login = asyncHandler(async (req, res, next) => {
  const loginCredentials = req.body;
  User.findOne({ where: { username: loginCredentials.username } }).then(
    (user) => {
      if (!user || !user.authenticate(loginCredentials.password)) {
        loginArgs.error = "Invalid username or password";
        res
          .status(404)
          .json({ success: false, data: { message: errorMessage } });
        return;
      }
      //Todo implement access token and redirection
      res.status(200).json({ success: true, data: user });
    }
  );
});

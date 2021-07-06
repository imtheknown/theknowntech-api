const asyncHandler = require('../middleware/async.middleware');
const encryption = require("../utils/encryption.utils");
const { User } = require('../models');
const { Op } = require('sequelize');


  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     description: Returns All Users
   *     tags:
   *      - Users
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: users
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: 
   *                   type: boolean
   *                   example: true
   *                 count: 
   *                   type: integer
   *                   example: 1
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       username:
   *                         type: string
   *                         description: username
   *                         example: imtheknown
   *                       email:
   *                         type: string
   *                         description: email of particular user
   *                         example: imtheknown@gmail.com
   */
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.findAndCountAll({attributes: ['username', 'email']});
    res.status(200).json({ success: true, count: users.count, data: users.rows });
});

  /**
   * @swagger
   * /api/v1/user/:id:
   *   get:
   *     description: Returns a user
   *     tags:
   *      - Users
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: user
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: 
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: object
   *                   items:
   *                     type: object
   *                     properties:
   *                       username:
   *                         type: string
   *                         description: username
   *                         example: imtheknown
   *                       email:
   *                         type: string
   *                         description: email of particular user
   *                         example: imtheknown@gmail.com
   */
   exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.params.id }, attributes: ['username', 'email'] });
    res.status(200).json({ success: true, data: user });
});



  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     tags:
   *      - Users
   *     description: Create a new user
   *     parameters:
   *       - in : body
   *         name: payload
   *         required: true
   *         description: payload for creating user.
   *         schema:
   *           type: json 
   *     produces:
   *      - application/json
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: 
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       description: The user ID.
   *                       example: 0
   *                     username:
   *                       type: string
   *                       description: username
   *                       example: imtheknown
   *                     email:
   *                       type: string
   *                       description: The user's email
   *                       example: imtheknown@gmail.com
   */
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
      let salt = encryption.generateSalt();
      let passwordHash = encryption.hashPassword(registerCredentials.password, salt);
      let userObject = {
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

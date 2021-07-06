const asyncHandler = require('../middleware/async.middleware');
const { User } = require('../models');


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
   * /api/v1/users:
   *   post:
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
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});
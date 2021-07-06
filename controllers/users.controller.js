const asyncHandler = require('../middleware/async.middleware');
const models = require('../models');


  /**
   * @swagger
   * /users:
   *   get:
   *     description: Returns All Users
   *     tags:
   *      - Users
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: users
   */
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await models.User.findAndCountAll({});
    console.log(users);
    res.status(200).json({ success: true, count: users.count, data: users.rows });
});
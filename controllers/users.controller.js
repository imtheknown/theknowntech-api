const asyncHandler = require('../middleware/async.middleware');
const User = require('../models/User.model');


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
exports.getUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});
const { Post } = require('../models');
const asyncHandler = require('../middleware/async.middleware');

exports.createPost = asyncHandler(async (req, res, next) => {
    let postCredentials = req.body;
    let errorMsg = '';
    if (!req) {
        errorMsg = 'You should be logged post an article'
    } else if (!postCredentials.title) {
        errorMsg = 'Invalid title!';
    } else if (!postCredentials.content) {
        errorMsg = 'Invalid content!';
    }

    if (errorMsg) {
        res.status(404).json({ success: false, data: {message: errorMessage}});
        return;
    }
    postCredentials.authorId = req.body.user.id;
    postCredentials.date = Date.now();
    postCredentials.author = req.body.user.username;
    console.log(postCredentials);
    Post.create(postCredentials).then(post => {
        res.status(201).json({ success: true, data: post });
        return;
    });
})
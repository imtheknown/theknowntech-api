const { Post, User } = require('../models');
const asyncHandler = require('../middleware/async.middleware');

exports.createPost = asyncHandler(async (req, res, next) => {
    const newPost = Post.build();
    newPost.authorId = req.sanitize('author-id').escape();
    newPost.title = req.sanitize('title').escape();
    newPost.date = Date.now();
    newPost.content = req.sanitize('content').escape();
    newPost.author = req.sanitize('author').escape();
    newPost.save()
		.then(function(instance){
			console.log(instance);
			res.status(200).json(instance);
		})
		.catch(function(error){
			res.status(500).json(error);
		})
})

exports.getPosts = asyncHandler(async (req, res, next) => {
    Post.findAll({
        include: [{
            model: User,
            as: 'user',
            nested: true
          }]
    })
    .then(function(artworks){
        res.status(200).json(artworks);
    })
    .catch(function(error){
        res.status(500).json(error);
    });
})

exports.getPost = asyncHandler(async (req, res, next) => {
    models.Artwork.findById({ where: { id: req.params.id, include: [{
        model: User,
        as: 'user',
        nested: true,
      }]}})
    .then(function(post){
        res.status(200).json(post);
    })
    .catch(function(error){
        res.status(500).json(error);
    });
})

exports.updatePost = asyncHandler(async (req, res, next) => {
    models.Artwork.findById(req.params.id)
    .then(function(postToUpdate){
        console.log(postToUpdate);
        postToUpdate.content = req.sanitize('content').escape();
        postToUpdate.save()
        .then(function(postToUpdate){
            res.status(200).json(postToUpdate);
        })
        .catch(function(error){
            res.status(500).json(error);
        })
    })
})

exports.deletePost = asyncHandler(async (req, res, next) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function(deletedPost){
        res.status(200).json(deletedPost);
    })
    .catch(function(error){
        res.status(500).json(error);
    });
});



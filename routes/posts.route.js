const express = require('express');

const {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost
} = require('../controllers/posts.controller');


const router = express.Router();

router
    .route('/')
    .post(createPost)
    .get(getPosts);

router
    .route('/:id')
    .get(getPost)
    .patch(updatePost)
    .delete(deletePost);

module.exports = router;
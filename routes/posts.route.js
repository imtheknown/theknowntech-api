const express = require('express');

const {
    createPost
} = require('../controllers/posts.controller');


const router = express.Router();

router
    .route('/')
    .post(createPost);

module.exports = router;
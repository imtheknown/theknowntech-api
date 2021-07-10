const express = require('express');

const {
    getUsers,
    getUser,
    createUser,
    deleteUser
} = require('../controllers/users.controller');


const router = express.Router();

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .delete(deleteUser);


module.exports = router;
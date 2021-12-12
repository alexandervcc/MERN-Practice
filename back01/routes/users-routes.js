const { check } = require('express-validator');
const express = require('express');

const route = express.Router();

const UserController = require('../controllers/users-controllers')

// GET /users
route.get("/", UserController.getUsers);

route.post(
    "/signup",
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 })
    ],
    UserController.postSignUp);

route.post(
    "/login",
    [
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 })
    ],
    UserController.postLogin);



module.exports = route
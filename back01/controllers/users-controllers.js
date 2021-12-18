const { validationResult } = require('express-validator')

const HttpError = require('../model/http-error')
const User = require('../model/User');

const getUsers = async (req, res, next) => {

    let Users;

    try {
        Users = await User.find({}, "-password");
        //const Users = User.find({},"email name");
    } catch (error) {
        const Error = new HttpError(error, 500);
        return next(Error);
    }

    res.json({ users: Users.map(us => us.toObject({ getters: true })) });
};


const postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const Error = new HttpError("Invalid Inputs", 422);
        return next(Error);
    }

    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        const Error = new HttpError(error, 500);
        return next(Error);
    }

    if (!existingUser || existingUser.password !== password) {
        const Error = new HttpError("Invalid Credentials", 500);
        return next(Error);
    }

    res.json({ meg: "Logged In!!" })

}

const postSignUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const Error = new HttpError('Invalid Input Passed', 422);
        return next(Error);
    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        const Error = new HttpError('Invalid Input Passed', 500);
        return next(Error);
    }

    if (existingUser) {
        const error = new HttpError('User Already Exists', 422);
        return next(error);
    };

    const createdUser = User({
        name,
        email,
        image: "001",
        password,
        places: []
    });

    try {
        await createdUser.save();
    } catch (error) {
        const Error = new HttpError(error, 500);
        return next(Error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });

}


module.exports = {
    getUsers,
    postLogin,
    postSignUp
}
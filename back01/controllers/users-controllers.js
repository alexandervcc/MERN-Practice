const { validationResult } = require('express-validator')

const HttpError = require('../model/http-error')

const getUsers = (req, res, next) => {

};

const postLogin = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid Input Passed',422);
    }
    
    const { email, password } = req.body;
}

const postSignUp = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid Input Passed',422);
    }

    const { name, email, password } = req.body;
}


module.exports = {
    getUsers,
    postLogin,
    postSignUp
}
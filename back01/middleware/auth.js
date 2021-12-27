const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Authentication Failed");
        }
        const decodedToken = jwt.verify(token, "Server Secret");
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        const Error = new HttpError("Authentication Failed", 401);
        return next(Error);
    }



};
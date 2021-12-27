const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password'); //exclude password
  } catch (err) {
    const error = new HttpError('Fetching users failed, please try again later.', 500);
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const postSignup = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Server Error. Findind User', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('User exists already', 422);
    return next(error);
  }

  let encryptedPassword
  try {
    encryptedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const Error = new HttpError('Server Error', 500);
    return next(Error);
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: encryptedPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later.', 500);
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "Server Secret",
      { expiresIn: '1h' }
    );
  } catch (error) {
    const Error = new HttpError('Signing up failed, please try again later.', 500);
    return next(Error);
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Loggin in failed, please try again later.', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('Invalid credentials, could not log you in.', 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Server Error.', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid Password', 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (error) {
    const Error = new HttpError('Signing up failed, please try again later.', 500);
    return next(Error);
  }


  res.status(201).json({ userId: existingUser.id, email: existingUser.email, token: token });
};

exports.getUsers = getUsers;
exports.postSignup = postSignup;
exports.postLogin = postLogin;

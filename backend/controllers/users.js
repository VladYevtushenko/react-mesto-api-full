const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const NotFoundError = require('../errors/notFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const { inputsError } = require('../utils/inputsError');

// POST create user

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res
        .status(200)
        .send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при создании пользователя, неверно указаны данные в полях: ${inputsError(err)}`));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с указанным email уже зарегистрован'));
      } else {
        next(err);
      }
    });
};

// login

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res
        .status(200)
        .send({ message: 'Вы вошли' });
    })
    .catch(next);
};

// GET lookup user

module.exports.getUser = (req, res, next) => User
  .findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с таким id не найден');
    }
    res
      .status(200)
      .send(user);
  })
  .catch(next);

// GET lookup all users

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((result) => res.send(result))
    .catch(next);
};

// GET lookup user by ID

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Отправлен неврный _id пользователя'));
        return;
      }
      next(err);
    });
};

// PATCH user info editing

module.exports.editUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при изменении данных пользователя, неверно указаны данные в полях: ${inputsError(err)}`));
        return;
      }
      next(err);
    });
};

// PATCH user's ava editing

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при изменении данных пользователя, неверно указаны данные в полях: ${inputsError(err)}`));
        return;
      }
      next(err);
    });
};

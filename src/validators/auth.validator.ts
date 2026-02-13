import { body, header } from 'express-validator';

export const register = [
  body('username')
    .notEmpty()
    .withMessage('Username is required!')
    .isString()
    .withMessage('Username must be a string!')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username length must contains from 3 to 50 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email address is required!')
    .isEmail()
    .withMessage('Email address is not valid!'),
  body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8, max: 256 })
    .withMessage('Password must contains 8 characters or more!'),
];

export const login = [
  body('email')
    .notEmpty()
    .withMessage('Email address is required!')
    .isEmail()
    .withMessage('Email address is not valid!'),
  body('password').notEmpty().withMessage('Password is required!'),
];

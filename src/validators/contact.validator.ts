import { body, param } from 'express-validator';

export const create = [
  body('fullname')
    .notEmpty()
    .withMessage('Fullname must not be empty!')
    .isString()
    .withMessage('Fullname is not valid!')
    .isLength({ min: 3, max: 50 })
    .withMessage('Fullname must contains at least 3 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email address must not be empty!')
    .isEmail()
    .withMessage('Email address is not valid!'),
  body('message')
    .notEmpty()
    .withMessage('Message content must not be empty!')
    .isString()
    .withMessage('Message content is not valid!')
    .isLength({ min: 10, max: 256 })
    .withMessage('Message content must contains at least 10 characters'),
];

export const getById = [
  param('id')
    .notEmpty()
    .withMessage('Contact ID must not be empty!')
    .isMongoId()
    .withMessage('Contact ID is not valid!'),
];

export const deleteById = [
  param('id')
    .notEmpty()
    .withMessage('Contact ID must not be empty!')
    .isMongoId()
    .withMessage('Contact ID is not valid!'),
];

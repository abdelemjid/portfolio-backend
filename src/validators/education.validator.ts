import { body, param } from 'express-validator';

export const createEducation = [
  body('name')
    .notEmpty()
    .withMessage('Education name must not be empty!')
    .isString()
    .withMessage('Education name must be a string!'),
  body('learningSource')
    .notEmpty()
    .withMessage('Education learningSource must not be empty!')
    .isString()
    .withMessage('Education learningSource must be a string!'),
  body('description')
    .notEmpty()
    .withMessage('Education description must not be empty!')
    .isString()
    .withMessage('Education description must be a string!'),
  body('startingTime')
    .notEmpty()
    .withMessage('Education startingTime must not be empty!')
    .isDate({ format: 'dd/MM/yyyy' }) // change it to accept ISO format only
    .withMessage('Education startingTime must be a Date type!'),
  body('icon')
    .notEmpty()
    .withMessage('Education icons is required, and must not be empty!')
    .isString()
    .withMessage('Education must be a string!'),
];

export const updateEducation = [
  param('id')
    .notEmpty()
    .withMessage('Education ID must not be empty!')
    .isMongoId()
    .withMessage('Education ID is not valid!'),
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Education name must not be empty!')
    .isString()
    .withMessage('Education name must be a string!'),
  body('learningSource')
    .optional()
    .notEmpty()
    .withMessage('Education learningSource must not be empty!')
    .isString()
    .withMessage('Education learningSource must be a string!'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Education description must not be empty!')
    .isString()
    .withMessage('Education description must be a string!'),
  body('startingTime')
    .optional()
    .notEmpty()
    .withMessage('Education startingTime must not be empty!')
    .isDate({ format: 'dd/MM/yyyy' }) // change it to accept ISO format only
    .withMessage('Education startingTime must be a Date type!'),
  body('icon')
    .optional()
    .notEmpty()
    .withMessage('Education icons is required, and must not be empty!')
    .isString()
    .withMessage('Education must be a string!'),
];

export const getEducation = [
  param('id')
    .notEmpty()
    .withMessage('Education ID is required, it must not be empty!')
    .isMongoId()
    .withMessage('Education ID is not valid!'),
];

export const deleteEducation = [
  param('id')
    .notEmpty()
    .withMessage('Education ID is required, it must not be empty!')
    .isMongoId()
    .withMessage('Education ID is not valid!'),
];

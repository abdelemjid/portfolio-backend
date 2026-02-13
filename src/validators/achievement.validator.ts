import { body, param } from 'express-validator';

export const createAchievement = [
  body('title')
    .isString()
    .withMessage('Achievement title must be as string!')
    .notEmpty()
    .withMessage('Achievement title must not be empty'),
  body('count')
    .isInt({ min: 0, max: 9999 })
    .withMessage('Achievement count must be a number, ranging from 0 to 9999!'),
];

export const getAchievement = [
  param('id')
    .notEmpty()
    .withMessage('Achievement ID is required!')
    .isMongoId()
    .withMessage('Achievement ID is not valid!'),
];

export const updateAchievement = [
  param('id')
    .notEmpty()
    .withMessage('Achievement ID is required!')
    .isMongoId()
    .withMessage('Achievement ID is not valid!'),
  body('title')
    .optional()
    .isString()
    .withMessage('Achievement title must be as string!')
    .notEmpty()
    .withMessage('Achievement title must not be empty'),
  body('count')
    .optional()
    .isInt({ min: 0, max: 9999 })
    .withMessage('Achievement count must be a number, ranging from 0 to 9999!'),
];

export const deleteAchievement = [
  param('id')
    .notEmpty()
    .withMessage('Achievement ID is required!')
    .isMongoId()
    .withMessage('Achievement ID is not valid!'),
];

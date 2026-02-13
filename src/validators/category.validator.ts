import { body, param } from 'express-validator';

export const createCategory = [
  body('name')
    .isString()
    .withMessage('Category name must be a string!')
    .isLength({ min: 1, max: 50 })
    .withMessage('Category name must be 1 to 50 characters!'),
  body('description')
    .optional()
    .isString()
    .withMessage('Category name must be a string!')
    .isLength({ min: 1, max: 150 })
    .withMessage('Category name must be 1 to 50 characters!'),
];

export const updateCategory = [
  param('id').isMongoId().withMessage('Category ID not valid!'),
  body('name')
    .optional()
    .isString()
    .withMessage('Category name must be a string!')
    .isLength({ min: 1, max: 50 })
    .withMessage('Category name must be 1 to 50 characters!'),
  body('description')
    .optional()
    .isString()
    .withMessage('Category name must be a string!')
    .isLength({ min: 1, max: 150 })
    .withMessage('Category name must be 1 to 50 characters!'),
];

export const getCategory = [param('id').isMongoId().withMessage('Category ID not valid!')];

export const deleteCategory = [param('id').isMongoId().withMessage('Category ID not valid!')];

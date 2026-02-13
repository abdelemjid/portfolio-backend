import { body, param } from 'express-validator';

export const createInfo = [
  body('name')
    .notEmpty()
    .withMessage('Name is required, and must not be empty!')
    .isString()
    .withMessage('Name must be a string!'),
  body('nationality')
    .notEmpty()
    .withMessage('Nationality is required, and must not be empty!')
    .isString()
    .withMessage('Nationality must be a string!'),
  body('freelance')
    .notEmpty()
    .withMessage('Freelance must not be empty!')
    .isBoolean()
    .withMessage('Freelance must be a boolean!'),
  body('graduated')
    .notEmpty()
    .withMessage('Graduation list must not be empty!')
    .isArray({ min: 1 })
    .withMessage('Graduation must be a list, and has at least 1 item!'),
  body('specializations')
    .notEmpty()
    .withMessage('Specializations list must not be empty!')
    .isArray({ min: 1 })
    .withMessage('Specializations must be a list, and has at least 1 item!'),
  body('whatsapp')
    .optional()
    .notEmpty()
    .withMessage('WhatsApp must not be empty!')
    .isString()
    .withMessage('WhatsApp must be a string!'),
  body('languages')
    .notEmpty()
    .withMessage('Language list must not be empty!')
    .isArray({ min: 1 })
    .withMessage('Languages must be a list, and has at least 1 item!'),
];

export const updateInfo = [
  param('id')
    .notEmpty()
    .withMessage('Info ID is required, and must not be empty!')
    .isMongoId()
    .withMessage('Info ID is not valid!'),
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Name is required, and must not be empty!')
    .isString()
    .withMessage('Name must be a string!'),
  body('nationality')
    .optional()
    .notEmpty()
    .withMessage('Nationality is required, and must not be empty!')
    .isString()
    .withMessage('Nationality must be a string!'),
  body('freelance')
    .optional()
    .notEmpty()
    .withMessage('Freelance must not be empty!')
    .isBoolean()
    .withMessage('Freelance must be a boolean!'),
  body('graduated')
    .optional()
    .notEmpty()
    .withMessage('Graduation list must not be empty!')
    .isArray({ min: 1 })
    .withMessage('Graduation must be a list, and has at least 1 item!'),
  body('specializations')
    .optional()
    .notEmpty()
    .withMessage('Specializations list must not be empty!')
    .isArray({ min: 1 })
    .withMessage('Specializations must be a list, and has at least 1 item!'),
  body('whatsapp')
    .optional()
    .notEmpty()
    .withMessage('WhatsApp must not be empty!')
    .isString()
    .withMessage('WhatsApp must be a string!'),
  body('languages')
    .optional()
    .notEmpty()
    .withMessage('Language list must not be empty!')
    .isArray({ min: 1 })
    .withMessage('Languages must be a list, and has at least 1 item!'),
];

export const deleteInfo = [
  param('id')
    .notEmpty()
    .withMessage('Information ID must not be empty!')
    .isMongoId()
    .withMessage('Information ID is not valid!'),
];

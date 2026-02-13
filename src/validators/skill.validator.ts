import { body, param } from 'express-validator';

export const createSkill = [
  body('categoryId')
    .notEmpty()
    .withMessage('Category ID is required to organize the Skills!!')
    .isMongoId()
    .withMessage('Category ID not valid!'),
  body('name')
    .isString()
    .withMessage('Skill name must be a string!')
    .isLength({ min: 1 })
    .withMessage('Skill name must not be empty!'),
  body('proficiency')
    .isInt({ min: 1, max: 100 })
    .withMessage('Skill proficiency must be a number ranging between 1 and 100!'),
];

export const updateSkill = [
  param('id').isMongoId().withMessage('Skill ID not valid!'),
  body('categoryId').optional().isMongoId().withMessage('Category ID is not valid!'),
  body('name')
    .optional()
    .isString()
    .withMessage('Skill name must be a string!')
    .isLength({ min: 1 })
    .withMessage('Skill name must not be empty!'),
  body('proficiency')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Skill proficiency must be a number ranging between 1 and 100!'),
];

export const deleteSkill = [param('id').isMongoId().withMessage('Skill ID not valid!')];

export const getSkill = [param('id').isMongoId().withMessage('Skill ID not valid!')];

export const getSkillByCategory = [
  param('id')
    .notEmpty()
    .withMessage('Category ID is required!')
    .isMongoId()
    .withMessage('Category ID is not valid!'),
];

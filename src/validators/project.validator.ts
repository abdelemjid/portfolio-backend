import { body, param } from 'express-validator';

export const projectGetOne = [param('id').isMongoId().withMessage('Project ID: not valid!')];

export const projectCreate = [
  body('name')
    .isString()
    .withMessage("Project's name must be a string!")
    .isEmpty()
    .withMessage("Project's name must not be empty!")
    .isLength({ min: 1, max: 30 })
    .withMessage("Project's Name must be 1-30 characters"),
  body('description')
    .isString()
    .withMessage("Project's description must be a string!")
    .isEmpty()
    .withMessage("Project's description must not be empty!")
    .isLength({ min: 15, max: 250 })
    .withMessage("Project's Description must be 15-150 characters"),
  body('link').optional().isURL().withMessage('Project Link: must be a URL'),
  body('technologies').isString().withMessage('Project Technologies: must be a string'),
  body('alive').isBoolean().withMessage('Project Alive: must be a boolean'),
  body('projectImage').custom((_, { req }) => {
    if (!req.file) throw new Error('Project Image is required!');
    return true;
  }),
];

export const projectUpdate = [
  param('id').isMongoId().withMessage('Project ID: not valid!'),
  body('name')
    .notEmpty()
    .withMessage("Project's name mustn't be empty!")
    .isString()
    .withMessage("Project's name must be as string!")
    .isLength({ min: 1, max: 30 })
    .withMessage("Project's Name must be 1-30 characters"),
  body('description')
    .isString()
    .withMessage("Project's description must be a string!")
    .isLength({ min: 15, max: 250 })
    .withMessage("Project's Description must be 15-150 characters"),
  body('link').optional().isURL().withMessage('Project Link: must be a URL'),
  body('technologies').isString().withMessage('Project Technologies: must be a string'),
  body('alive').isBoolean().withMessage('Project Alive: must be a boolean'),
  body('projectImage')
    .optional()
    .custom((_, { req }) => {
      if (!req.file) throw new Error('Project Image is required!');
      return true;
    }),
];

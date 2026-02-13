import { NextFunction, Request, Response, Router } from 'express';
import * as validator from '../validators/category.validator';
import { CategoryController } from '../controllers/category.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async.handler';

const router = Router();
const controller = new CategoryController();
const middleware = new AuthMiddleware();

router.get('/', asyncHandler(controller.getAll));

router.post('/', middleware.verifyToken, validator.createCategory, asyncHandler(controller.create));

router.patch(
  '/:id',
  middleware.verifyToken,
  validator.updateCategory,
  asyncHandler(controller.update),
);

router.get('/:id', middleware.verifyToken, validator.getCategory, asyncHandler(controller.get));

router.delete(
  '/:id',
  middleware.verifyToken,
  validator.deleteCategory,
  asyncHandler(controller.delete),
);

export default router;

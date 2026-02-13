import { Router } from 'express';
import { EducationController } from '../controllers/education.controller';
import { asyncHandler } from '../utils/async.handler';
import * as validator from '../validators/education.validator';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new EducationController();
const middleware = new AuthMiddleware();

router.get('/', asyncHandler(controller.get));

router.post(
  '/',
  middleware.verifyToken,
  validator.createEducation,
  asyncHandler(controller.create),
);

router.patch(
  '/:id',
  middleware.verifyToken,
  validator.updateEducation,
  asyncHandler(controller.update),
);

router.get(
  '/:id',
  middleware.verifyToken,
  validator.getEducation,
  asyncHandler(controller.getById),
);

router.delete(
  '/:id',
  middleware.verifyToken,
  validator.deleteEducation,
  asyncHandler(controller.delete),
);

export default router;

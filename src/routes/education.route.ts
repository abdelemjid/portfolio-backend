import { Router } from 'express';
import { EducationController } from '../controllers/education.controller';
import { asyncHandler } from '../utils/async.handler';
import * as validator from '../validators/education.validator';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { globalLimiter } from '../middlewares/ratelimiter.middleware';

const router = Router();
const controller = new EducationController();
const middleware = new AuthMiddleware();

router.get('/', globalLimiter, asyncHandler(controller.get));

router.post(
  '/',
  globalLimiter,
  middleware.verifyToken,
  validator.createEducation,
  asyncHandler(controller.create),
);

router.patch(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.updateEducation,
  asyncHandler(controller.update),
);

router.get(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.getEducation,
  asyncHandler(controller.getById),
);

router.delete(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.deleteEducation,
  asyncHandler(controller.delete),
);

export default router;

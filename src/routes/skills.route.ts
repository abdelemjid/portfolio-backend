import { Router } from 'express';
import * as validator from '../validators/skill.validator';
import { SkillController } from '../controllers/skill.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async.handler';
import { globalLimiter } from '../middlewares/ratelimiter.middleware';

const controller = new SkillController();
const middleware = new AuthMiddleware();
const router = Router();

router.get('/', globalLimiter, asyncHandler(controller.getAll));

router.post(
  '/',
  globalLimiter,
  middleware.verifyToken,
  validator.createSkill,
  asyncHandler(controller.create),
);

router.patch(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.updateSkill,
  asyncHandler(controller.update),
);

router.get(
  '/category/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.getSkillByCategory,
  asyncHandler(controller.getByCategory),
);

router.get(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.getSkill,
  asyncHandler(controller.getById),
);

router.delete(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.deleteSkill,
  asyncHandler(controller.delete),
);

export default router;

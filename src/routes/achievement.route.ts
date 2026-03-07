import { Router } from 'express';
import { AchievementController } from '../controllers/achievement.controller';
import { asyncHandler } from '../utils/async.handler';
import * as validator from '../validators/achievement.validator';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { globalLimiter } from '../middlewares/ratelimiter.middleware';

const router = Router();
const controller = new AchievementController();
const middleware = new AuthMiddleware();

router.get('/', globalLimiter, asyncHandler(controller.get));

router.post(
  '/',
  middleware.verifyToken,
  validator.createAchievement,
  asyncHandler(controller.create),
);

router.get(
  '/:id',
  middleware.verifyToken,
  validator.getAchievement,
  asyncHandler(controller.getById),
);

router.patch(
  '/:id',
  middleware.verifyToken,
  validator.updateAchievement,
  asyncHandler(controller.update),
);

router.delete(
  '/:id',
  middleware.verifyToken,
  validator.deleteAchievement,
  asyncHandler(controller.delete),
);

export default router;

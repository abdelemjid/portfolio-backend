import { Router } from 'express';
import { asyncHandler } from '../utils/async.handler';
import { InfoController } from '../controllers/info.controller';
import * as validator from '../validators/info.validator';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { globalLimiter } from '../middlewares/ratelimiter.middleware';

const router = Router();
const controller = new InfoController();
const middleware = new AuthMiddleware();

router.get('/', globalLimiter, asyncHandler(controller.get));

router.post(
  '/',
  globalLimiter,
  middleware.verifyToken,
  validator.createInfo,
  asyncHandler(controller.create),
);

router.patch(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.updateInfo,
  asyncHandler(controller.update),
);

router.delete(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.deleteInfo,
  asyncHandler(controller.delete),
);

export default router;

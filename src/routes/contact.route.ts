import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { asyncHandler } from '../utils/async.handler';
import * as validator from '../validators/contact.validator';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { contactLimiter, globalLimiter } from '../middlewares/ratelimiter.middleware';

const router = Router();
const controller = new ContactController();
const middleware = new AuthMiddleware();

router.get('/', middleware.verifyToken, asyncHandler(controller.getAll));

router.post('/', contactLimiter, validator.create, asyncHandler(controller.create));

router.get('/:id', middleware.verifyToken, validator.getById, asyncHandler(controller.getById));

router.delete(
  '/:id',
  middleware.verifyToken,
  validator.deleteById,
  asyncHandler(controller.delete),
);

export default router;

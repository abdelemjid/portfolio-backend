import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/async.handler';
import * as validator from '../validators/auth.validator';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new AuthController();
const middleware = new AuthMiddleware();

router.post('/register', validator.register, asyncHandler(controller.register));
router.post('/login', validator.login, asyncHandler(controller.login));
router.get('/logout', middleware.verifyToken, asyncHandler(controller.logout));

export default router;

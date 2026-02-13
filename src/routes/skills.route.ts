import { Router } from 'express';
import * as validator from '../validators/skill.validator';
import { SkillController } from '../controllers/skill.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async.handler';

const controller = new SkillController();
const middleware = new AuthMiddleware();
const router = Router();

router.get('/', asyncHandler(controller.getAll));

router.post('/', middleware.verifyToken, validator.createSkill, asyncHandler(controller.create));

router.patch(
  '/:id',
  middleware.verifyToken,
  validator.updateSkill,
  asyncHandler(controller.update),
);

router.get(
  '/category/:id',
  middleware.verifyToken,
  validator.getSkillByCategory,
  asyncHandler(controller.getByCategory),
);

router.get('/:id', middleware.verifyToken, validator.getSkill, asyncHandler(controller.getById));

router.delete(
  '/:id',
  middleware.verifyToken,
  validator.deleteSkill,
  asyncHandler(controller.delete),
);

export default router;

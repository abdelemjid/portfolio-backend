import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { ProjectController } from '../controllers/project.controller';
import * as validator from '../validators/project.validator';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async.handler';
import { globalLimiter } from '../middlewares/ratelimiter.middleware';

const router = Router();
const controller = new ProjectController();
const middleware = new AuthMiddleware();

// initialize multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (_, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("The project image type's is invalid!"));
    }
  },
  limits: {
    fileSize: 1 * 1024 * 1024, // Max Image Size: 1MB
  },
});

// Create
router.post(
  '/',
  globalLimiter,
  middleware.verifyToken,
  upload.single('projectImage'),
  validator.projectCreate,
  asyncHandler(controller.create),
);
// Update
router.patch(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  upload.single('projectImage'),
  validator.projectUpdate,
  asyncHandler(controller.update),
);
// Fetch
router.get('/', asyncHandler(controller.readAll));
// Fetch by ID
router.get(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.projectGetOne,
  asyncHandler(controller.readOne),
);
// Delete by ID
router.delete(
  '/:id',
  globalLimiter,
  middleware.verifyToken,
  validator.projectGetOne,
  asyncHandler(controller.delete),
);

export default router;

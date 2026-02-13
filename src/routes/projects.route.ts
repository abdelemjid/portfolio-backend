import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { ProjectController } from '../controllers/project.controller';
import * as validator from '../validators/project.validator';
import { AuthMiddleware } from '../middlewares/auth.middleware';

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
  middleware.verifyToken,
  upload.single('projectImage'),
  validator.projectCreate,
  (req: Request, res: Response, next: NextFunction) => controller.create(req, res).catch(next),
);
// Update
router.patch(
  '/:id',
  middleware.verifyToken,
  upload.single('projectImage'),
  validator.projectUpdate,
  (req: Request, res: Response, next: NextFunction) => controller.update(req, res).catch(next),
);
// Fetch
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  controller.readAll(req, res).catch(next),
);
// Fetch by ID
router.get(
  '/:id',
  middleware.verifyToken,
  validator.projectGetOne,
  (req: Request, res: Response, next: NextFunction) => controller.readOne(req, res).catch(next),
);
// Delete by ID
router.delete(
  '/:id',
  middleware.verifyToken,
  validator.projectGetOne,
  (req: Request, res: Response, next: NextFunction) => controller.delete(req, res).catch(next),
);

export default router;

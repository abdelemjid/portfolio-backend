import { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export class AuthMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.auth_token || req.headers.authorization;

      if (!token) return res.status(401).json({ message: 'Unauthorized Access!' });
      if (!process.env.JWT_SECRET_KEY) throw new Error('Secret Key is not defined!');

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;

      req.userId = decoded.userId;

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error!' });
    }
  }
}

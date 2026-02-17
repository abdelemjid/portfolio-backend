import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';

export class AuthController {
  async register(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ message: errors.array()[0].msg });
    }

    try {
      const { username, email, password } = req.body;
      const secretKey = process.env.JWT_SECRET_KEY as string;
      if (!secretKey)
        return res.status(500).json({ message: 'Something went wrong during the registration!' });

      const used = await userModel.findOne({ email: email });
      if (used) {
        return res.status(400).json({ message: "You can't register with this email address!" });
      }

      const hashed = await bcrypt.hash(password, 12);
      const credentials = new userModel({ username, email, password: hashed });

      await credentials.save();

      const token = jwt.sign({ id: credentials._id, email }, secretKey, {
        expiresIn: '1d',
      });

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({ message: 'Your account created successfully.' });
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }

  async login(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ message: errors.array()[0].msg });
    }

    try {
      const { email, password } = req.body;

      const exists = await userModel.findOne({ email: email });
      if (!exists) return res.status(400).json({ message: 'Wrong credentials!!' });

      const matched = await bcrypt.compare(password, exists.password);
      if (!matched) return res.status(400).json({ message: 'Wrong credentials!' });

      const secretKey = process.env.JWT_SECRET_KEY as string;
      if (!secretKey)
        return res.status(500).json({ message: 'Something went wrong during the registration!' });

      const token = jwt.sign({ id: exists._id, email }, secretKey, {
        expiresIn: '1d',
      });

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ message: "You're logged-in." });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }

  async logout(req: Request, res: Response): Promise<Response | void> {
    try {
      res.cookie('auth_token', '', {
        expires: new Date(0),
      });

      return res.status(200).json({ message: "You're logged-out." });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }
}

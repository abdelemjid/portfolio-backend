import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import achievementModel from '../models/achievement.model';

export class AchievementController {
  async create(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { title, count } = req.body;

      const ach = new achievementModel({ title, count });
      if (!ach) return res.status(400).json({ message: 'Something went wrong!' });

      await ach.save();

      return res.status(201).json({ message: 'New achievement added successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }

  async get(req: Request, res: Response): Promise<Response | void> {
    try {
      const achievements = await achievementModel.find();
      if (!achievements) return res.status(400).json({ message: 'Something went wrong!' });

      return res.status(200).json(achievements);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Achievement ID is required!' });

      const achievement = await achievementModel.findById(id);
      if (!achievement) return res.status(404).json({ message: 'Achievement not found!' });

      return res.status(200).json(achievement);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }

  async update(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      const title = req.body.title;
      const count = req.body.count;

      if (!id) return res.status(400).json({ message: 'Achievement ID is required!' });

      const data: { title?: string; count?: number } = {};
      if (title) data.title = title;
      if (count) data.count = count;

      const updated = await achievementModel.findByIdAndUpdate(id, data);
      if (!updated) return res.status(400).json({ message: 'Something went wrong' });

      return res.status(200).json({ message: 'Achievement updated.' });
    } catch (error) {
      console.log('Error while updating an achievement:', error);
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Achievement ID is required!' });

      const deleted = await achievementModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Achievement not found!' });

      return res.status(200).json({ message: 'Achievement deleted.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }
}

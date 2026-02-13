import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import educationModel from '../models/education.model';

export class EducationController {
  async create(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { name, learningSource, description, startingTime } = req.body;

      const education = new educationModel({ name, learningSource, description, startingTime });
      if (!education) return res.status(500).json({ message: 'Something went wrong!' });

      await education.save();

      return res.status(201).json({ message: 'Education object is created successfully.' });
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
      const name = req.body.name;
      const learningSource = req.body.learningSource;
      const description = req.body.description;
      const startingTime = req.body.startingTime;

      const data: {
        name?: string;
        learningSource?: string;
        description?: string;
        startingTime?: Date;
      } = {};

      if (name) data.name = name;
      if (learningSource) data.learningSource = learningSource;
      if (description) data.description = description;
      if (startingTime) data.startingTime = new Date(startingTime);

      const updated = await educationModel.findByIdAndUpdate(id, data);
      if (!updated) return res.status(200).json({ message: 'Nothing is updated!' });

      return res.status(200).json({ message: 'Education object is updated successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }

  async get(req: Request, res: Response): Promise<Response | void> {
    try {
      const educations = await educationModel.find();
      if (!educations) return res.status(500).json({ message: 'Something went wrong!' });

      return res.status(200).json(educations);
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
      if (!id) {
        return res.status(400).json({ message: 'Education ID is required to get a specific one!' });
      }

      const education = await educationModel.findById(id);
      if (!education) return res.status(404).json({ message: 'Education object not found!' });

      return res.status(200).json(education);
    } catch (error) {
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
      if (!id) {
        return res
          .status(400)
          .json({ message: 'Education ID is required to delete a specific one!' });
      }

      const deleted = await educationModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Education object not found!' });

      return res.status(200).json({ message: 'Education object is deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }
}

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import categoryModel from '../models/category.model';
import { CategoryWithSkills } from '../types/ResponseTypes';
import { runInContext } from 'node:vm';

export class CategoryController {
  constructor() {}

  public create = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { name, description, icon } = req.body;
      if (!name) return res.status(400).json({ message: 'Category name is required!' });

      const data: { name: string; description?: string; icon?: string } = { name };
      if (description) data.description = description;
      if (icon) data.icon = icon;

      const category = new categoryModel(data);
      await category.save();

      return res.status(201).json({ message: 'New category added successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  public update = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      const { name, description, icon } = req.body;

      const data: { name?: string; description?: string; icon?: string } = {};
      if (name) data.name = name;
      if (description) data.description = description;
      if (icon) data.icon = icon;

      const updated = await categoryModel.findByIdAndUpdate(id, data);
      if (!updated) return res.status(404).json({ message: 'Category not found!' });

      return res.status(200).json({ message: 'Category updated.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  public get = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Category ID is required!' });

      const category = await categoryModel.findOne({ _id: id });
      if (!category) return res.status(404).json({ message: 'Category not found!' });

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  public getCategorySkills = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const categories = await categoryModel.aggregate<CategoryWithSkills>([
        {
          $lookup: {
            from: 'skills',
            localField: '_id',
            foreignField: 'categoryId',
            as: 'skills',
          },
        },
        {
          $addFields: {
            skillCount: { $size: '$skills' },
          },
        },
        {
          $match: {
            skillCount: { $gt: 0 },
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            icon: 1,
            skillCount: 1,
            skills: {
              _id: 1,
              name: 1,
              proficiency: 1,
              icon: 1,
            },
          },
        },
        {
          $sort: { name: 1 },
        },
      ]);

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const categories = await categoryModel.find();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Category ID is required!' });

      const deleted = await categoryModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Category not found!' });

      return res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };
}

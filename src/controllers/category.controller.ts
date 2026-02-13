import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import categoryModel from '../models/category.model';

export class CategoryController {
  constructor() {}

  public create = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { name, description } = req.body;
      if (!name) return res.status(400).json({ message: 'Category name is required!' });

      const data: { name: string; description?: string } = { name };
      if (description) data.description = description;

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
      const { name, description } = req.body;

      const data: { name?: string; description?: string } = {};
      if (name) data.name = name;
      if (description) data.description = description;

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

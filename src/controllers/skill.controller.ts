import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import skillModel from '../models/skill.model';

export class SkillController {
  constructor() {}

  /**
   * Function that creates new skill.
   *
   * @param req Express request
   * @param res Express response
   * @returns status codes:
   *          - [201] Created
   *          - [400] Bar Request
   *          - [500] Internal Error
   */
  public create = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { name, proficiency, categoryId } = req.body;

      const skill = new skillModel({ name, proficiency, categoryId });
      if (!skill)
        return res.status(500).json({ message: 'Something went wrong during the skill creation!' });

      await skill.save();

      return res.status(201).json({ message: 'New skill added successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  /**
   * Function that updates specific skill using its ID.
   *
   * @param req Express request
   * @param res Express response
   * @returns status codes:
   *        - [200] Nothing Updated
   *        - [201] Updated
   *        - [400] Bad Request
   *        - [500] Internal Error
   */
  public update = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      const name = req.body.name;
      const proficiency = req.body.proficiency;
      const categoryId = req.body.categoryId;

      const data: { name?: string; proficiency?: number; categoryId?: string } = {};
      if (name) data.name = name;
      if (proficiency) data.proficiency = proficiency;
      if (categoryId) data.categoryId = categoryId;

      const updated = await skillModel.findByIdAndUpdate(id, data);
      if (!updated) return res.status(200).json({ message: 'Skill did not updated.' });

      return res.status(201).json({ message: 'Skill updated successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const skills = await skillModel.find();
      if (!skills) return res.status(404).json({ message: 'Not skill learned yet!' });

      return res.status(200).json(skills);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  public getById = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Skill ID is required!' });

      const skill = await skillModel.findById(id);
      if (!skill) return res.status(404).json({ message: 'Skill not found!' });

      return res.status(200).json(skill);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  public getByCategory = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Category ID is required!' });

      const skills = await skillModel.find({ categoryId: id });
      if (!skills) return res.status(404).json({ message: 'No skill is found!' });

      return res.status(200).json(skills);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Skill ID is required!' });

      const deleted = await skillModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Skill not found!' });

      return res.status(200).json({ message: 'Skill deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };
}

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import infoModel from '../models/info.model';

/**
 * Controller for handling profile information operations.
 */
export class InfoController {
  /**
   * Create a new profile information document.
   *
   * Validates request input and persists a new infoModel document.
   *
   * @param req - Express request. Expected body properties:
   *   - name: string
   *   - nationality: string
   *   - freelance: boolean
   *   - graduated: string[]
   *   - specializations: string[]
   *   - languages: string[]
   *   - whatsapp?: string
   * @param res - Express response. Responses:
   *   - 201: Profile created successfully.
   *   - 400: Something went wrong while creating the model.
   *   - 404: Validation error (first error message returned).
   *   - 500: Internal server error.
   * @returns A Promise resolving to the HTTP response or void.
   */
  async create(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ message: errors.array()[0].msg });
    }

    try {
      const { name, nationality, freelance, graduated, specializations, languages } = req.body;
      const whatsapp = req.body.whatsapp;

      const data: {
        name: string;
        nationality: string;
        freelance: boolean;
        graduated: string[];
        specializations: string[];
        languages: string[];
        whatsapp?: string;
      } = {
        name,
        nationality,
        freelance,
        graduated,
        specializations,
        languages,
      };

      if (whatsapp) data.whatsapp = whatsapp;

      const info = new infoModel(data);
      if (!info) return res.status(400).json({ message: 'Something went wrong!' });

      await info.save();

      return res.status(201).json({ message: 'Your Profile Information is Created Successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Sever Error!' });
    }
  }

  /**
   * Update profile information by creating/saving a new document with provided fields.
   *
   * Only provided fields in the request body are included in the saved document.
   *
   * @param req - Express request. Optional body properties:
   *   - name?: string
   *   - nationality?: string
   *   - freelance?: boolean
   *   - graduated?: string[]
   *   - specializations?: string[]
   *   - languages?: string[]
   *   - whatsapp?: string
   * @param res - Express response. Responses:
   *   - 201: Profile information created/updated successfully.
   *   - 400: Something went wrong while creating the model.
   *   - 404: Validation error (first error message returned).
   *   - 500: Internal server error.
   * @returns A Promise resolving to the HTTP response or void.
   */
  async update(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      const whatsapp = req.body.whatsapp;
      const name = req.body.name;
      const nationality = req.body.nationality;
      const freelance = req.body.freelance;
      const graduated = req.body.graduated;
      const specializations = req.body.specializations;
      const languages = req.body.languages;

      const data: {
        name?: string;
        nationality?: string;
        freelance?: boolean;
        graduated?: string[];
        specializations?: string[];
        languages?: string[];
        whatsapp?: string;
      } = {};

      if (whatsapp) data.whatsapp = whatsapp;
      if (name) data.name = name;
      if (nationality) data.nationality = nationality;
      if (freelance) data.freelance = freelance;
      if (graduated) data.graduated = graduated;
      if (specializations) data.specializations = specializations;
      if (languages) data.languages = languages;

      const updated = await infoModel.findByIdAndUpdate(id, data);
      if (!updated) return res.status(200).json({ message: 'Nothing updated!' });

      return res.status(200).json({ message: 'Your Profile Information is Updated Successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Sever Error!' });
    }
  }

  /**
   * Retrieve all profile information documents.
   *
   * @param req - Express request.
   * @param res - Express response. Responses:
   *   - 200: Returns an array of info documents.
   *   - 400: Information not found.
   *   - 500: Internal server error.
   * @returns A Promise resolving to the HTTP response or void.
   */
  async get(req: Request, res: Response): Promise<Response | void> {
    try {
      const info = await infoModel.find();
      if (!info) return res.status(400).json({ message: 'Information not found!' });

      return res.status(200).json(info);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }

  /**
   * Delete profile information by ID.
   *
   * Validates request input, requires an `id` path parameter, and deletes the corresponding infoModel document.
   *
   * @param req - Express request. Path params:
   *   - id: string (required) — ID of the information document to delete.
   * @param res - Express response. Responses:
   *   - 200: Information object is deleted successfully.
   *   - 400: Missing `id` or information not found.
   *   - 404: Validation error (first error message returned) or object not found.
   *   - 500: Internal server error.
   * @returns A Promise resolving to the HTTP response or void.
   */
  async delete(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Information ID is required to delete it!' });

      const deleted = await infoModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Information object not found!' });

      return res.status(200).json({ message: 'Information object is deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  }
}

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v2 as cloudinary } from 'cloudinary';
import projectModel, { Project } from '../models/project.model';

export class ProjectController {
  constructor() {}

  /**
   * Function that uploads the images to cloudinary, and returns the image url.
   *
   * @param imageFile The Project Image
   * @returns The Uploaded Image URL
   */
  private uploadImage = async (imageFile: Express.Multer.File): Promise<string> => {
    try {
      const b64 = Buffer.from(imageFile.buffer).toString('base64');
      const dataURI = `data:${imageFile.mimetype};base64,${b64}`;
      const response = await cloudinary.uploader.upload(dataURI);

      return response.secure_url;
    } catch (error) {
      throw new Error('Image upload failed!');
    }
  };

  /**
   * Function that writes new project in the Mongo Database.
   *
   * @param req Express request
   * @param res Express response
   * @returns status code of:
   *          - [400] Bad Request
   *          - [500] Internal Server Error
   *          - [201] Created
   */
  public create = async (req: Request, res: Response) => {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      return res.status(400).json({ message: errors[0].msg });
    }

    try {
      const { name, description, technologies, link, alive } = req.body;

      const imageUrl = await this.uploadImage(req.file as Express.Multer.File);
      if (!imageUrl) throw new Error('Image upload failed!!!');

      const techs = Array.isArray(technologies) ? Array.from(technologies) : [technologies];

      const project = new projectModel({
        name,
        description,
        link,
        technologies: techs,
        alive,
        image: imageUrl,
      });

      await project.save();

      return res.status(201).json({ message: 'Project added successfully.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  };

  /**
   * Function that updates a specific project.
   *
   * @param req Express request
   * @param res Express response
   * @returns status codes:
   *          - [201] Updated
   *          - [204] Not Updated
   *          - [400] Bad Request
   *          - [500] Internal Error
   */
  public update = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      const name = req.body?.name;
      const description = req.body?.description;
      const technologies = req.body?.technologies;
      const alive = req.body?.alive;
      const link = req.body?.link;

      let techs = null;
      if (technologies) {
        techs = Array.isArray(technologies) ? [...Array.from(technologies)] : [technologies];
      }
      let imageUrl = null;
      if (req.file) {
        imageUrl = await this.uploadImage(req.file as Express.Multer.File);
      }

      const data: Partial<Project> = {};
      if (name) data.name = name;
      if (description) data.description = description;
      if (link) data.link = link;
      if (alive) data.alive = alive;
      if (imageUrl) data.image = imageUrl;
      if (techs) data.technologies = techs;

      const updated = await projectModel.findByIdAndUpdate(id, data);
      if (!updated) return res.status(204).json({ message: 'Nothing updated!' });

      return res.status(201).json({ message: 'Project updated successfully.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  /**
   * Function that returns the created projects.
   *
   * @param req Express request
   * @param res Express response
   * @returns status code of:
   *          - [500] Internal Server Error
   *          - [200] Response OK
   */
  public readAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const projects = await projectModel.find();
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  /**
   * Function that return the project by its ID.
   *
   * @param req Express request
   * @param res Express response
   * @returns status codes:
   *          - [200] Project Data
   *          - [500] Internal Server Error
   *          - [400] Bad Request (project id not included or not valid)
   */
  public readOne = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      return res.status(400).json({ message: errors[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Project ID: not included!' });

      const project = await projectModel.findOne({ _id: id });
      return res.status(200).json(project);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  /**
   * Function that deletes specific project using its ID.
   *
   * @param req Express request
   * @param res Express response
   * @returns status codes:
   *          - [200] Deleted
   *          - [500] Internal Error
   *          - [400] Bad Request (project ID not valid or not provided)
   */
  public delete = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Project ID is required to delete it!' });

      const deleted = await projectModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Project not found!' });

      return res.status(200).json({ message: 'Project deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };
}

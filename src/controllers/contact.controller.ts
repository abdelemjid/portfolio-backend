import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import contactModel, { IMessage } from '../models/contact.model';

export class ContactController {
  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { fullname, email, message } = req.body;

      const exists = await contactModel.findOne({ email: email });
      if (exists) {
        exists.messages.push({ message: message } as IMessage);
        await exists.save();
      } else {
        const contact = new contactModel({
          fullname,
          email,
          messages: [{ message: message } as IMessage],
        });
        if (!contact) return res.status(400).json({ message: 'Something went wrong!' });
        await contact.save();
      }

      return res.status(201).json({ message: 'Your contact info is registered.' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to register your contact info!' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response | void> {
    try {
      const contacts = await contactModel.find();
      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to register your contact info!' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Contact ID is required!' });

      const contact = await contactModel.findById(id);
      if (!contact) return res.status(404).json({ message: 'Contact not found!' });

      return res.status(200).json(contact);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete this contact!' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { id } = req.params;
      if (!id) res.status(400).json({ message: 'Contact ID is required!' });

      const deleted = await contactModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Contact not found!' });

      return res.status(200).json({ message: `Contact {${deleted._id}} is deleted.` });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete this contact!' });
    }
  }
}

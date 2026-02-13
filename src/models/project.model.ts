import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Project extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string | null;
  alive: boolean;
  createdAt?: Date;
}

const projectSchema = new Schema<Project>(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    link: { type: String, require: false },
    alive: { type: Boolean, required: true, default: false },
    technologies: { type: [String], required: true, default: [''] },
  },
  { timestamps: true },
);

export default mongoose.model<Project>('Project', projectSchema);

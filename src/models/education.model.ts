import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Education extends Document {
  _id: Types.ObjectId;
  name: string;
  learningSource: string;
  description: string;
  startingTime: Date;
  icon: string;
  createdAt?: Date;
}

const educationSchema = new Schema<Education>(
  {
    name: { type: String, required: true },
    learningSource: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    startingTime: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<Education>('Education', educationSchema);

import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Skill extends Document {
  _id: Types.ObjectId;
  name: string;
  proficiency: number;
  icon: string;
  categoryId: Types.ObjectId;
  createdAt?: Date;
}

const skillSchema = new Schema<Skill>(
  {
    name: { type: String, required: true },
    proficiency: { type: Number, required: true, default: 0 },
    icon: { type: String, required: false, default: null },
    categoryId: {
      type: Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<Skill>('Skill', skillSchema);

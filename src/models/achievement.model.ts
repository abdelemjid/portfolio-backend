import mongoose, { Types, Schema, Document } from 'mongoose';

export interface Achievement extends Document {
  _id: Types.ObjectId;
  title: string;
  count: number;
  createdAt?: Date;
}

const achievementSchema = new Schema<Achievement>(
  {
    title: { type: String, require: true },
    count: { type: Number, require: true, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model<Achievement>('Achievement', achievementSchema);

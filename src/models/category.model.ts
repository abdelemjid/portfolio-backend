import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Category extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  createdAt?: Date;
}

const schema = new Schema<Category>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Category', schema);

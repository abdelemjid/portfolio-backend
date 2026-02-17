import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Category extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  icon: string;
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
    icon: { type: String, required: false, default: null },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Category', schema);

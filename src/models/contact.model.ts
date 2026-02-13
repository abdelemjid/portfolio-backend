import mongoose, { Types, Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  _id: Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema(
  { message: { type: String, required: true } },
  { timestamps: true },
);

export interface Contact extends Document {
  fullname: string;
  email: string;
  messages: IMessage[];
}

const contactSchema = new Schema<Contact>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    messages: [messageSchema],
  },
  { timestamps: true },
);

export default mongoose.model<Contact>('Contact', contactSchema);

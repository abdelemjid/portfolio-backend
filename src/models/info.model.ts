import mongoose, { Types, Schema, Document } from 'mongoose';

export interface Info extends Document {
  _id: Types.ObjectId;
  name: string;
  nationality: string;
  freelance: boolean;
  graduated: string[];
  specializations: string[];
  whatsApp: string;
  languages: string[];
  createdAt?: Date;
}

const infoSchema = new Schema<Info>(
  {
    name: { type: String, required: true, default: 'Abdelemjid' },
    nationality: { type: String, required: true, default: 'Moroccan' },
    freelance: { type: Boolean, required: true, default: true },
    graduated: { type: [String], require: true, default: ['ALX'] },
    specializations: { type: [String], required: true, default: ['Backend'] },
    whatsApp: { type: String, required: false },
    languages: { type: [String], required: true, default: ['Arabic', 'English'] },
  },
  { timestamps: true },
);

export default mongoose.model<Info>('Info', infoSchema);

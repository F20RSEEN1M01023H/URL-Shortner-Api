import { Schema, model, Document } from 'mongoose';

export interface ILink extends Document {
  code: string;
  original_url: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const linkSchema = new Schema<ILink>(
  {
    code: { type: String, required: true, unique: true },
    original_url: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default model<ILink>('Link', linkSchema);

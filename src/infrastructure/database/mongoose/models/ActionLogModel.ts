import mongoose, { Schema, Document } from 'mongoose';
import { Role } from '../../../../domain/entities/User';

interface IActionLogDocument extends Document {
  requestId: number;
  author: string;
  authorRole: Role;
  action: string;
  createdAt: Date;
}

const ActionLogSchema = new Schema({
  requestId: { type: Number, required: true, index: true },
  author: { type: String, required: true },
  authorRole: { type: String, required: true },
  action: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export const ActionLogModel = mongoose.model<IActionLogDocument>(
  'ActionLog',
  ActionLogSchema,
);

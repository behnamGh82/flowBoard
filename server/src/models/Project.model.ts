import mongoose, { Schema } from 'mongoose'
import type { IProject } from '../types'

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    key: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ['active', 'archived', 'on_hold'], default: 'active' },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    color: { type: String, default: '#4F46E5' },
  },
  { timestamps: true },
)

export const Project = mongoose.model<IProject>('Project', projectSchema)

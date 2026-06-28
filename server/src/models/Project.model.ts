import mongoose, { Schema } from 'mongoose'
import type { IProject } from '../types'
import {
  PROJECT_PRIORITIES,
  PROJECT_STATUSES,
  PROJECT_VISIBILITIES,
  DEFAULT_PROJECT_ICON,
} from '../constants/project'

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    key: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: PROJECT_STATUSES,
      default: 'planning',
    },
    priority: {
      type: String,
      enum: PROJECT_PRIORITIES,
      default: 'medium',
    },
    visibility: {
      type: String,
      enum: PROJECT_VISIBILITIES,
      default: 'team',
    },
    icon: { type: String, default: DEFAULT_PROJECT_ICON },
    startDate: { type: Date },
    deadline: { type: Date },
    coverImage: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    color: { type: String, default: '#4F46E5' },
  },
  { timestamps: true },
)

projectSchema.index({ owner: 1, status: 1 })
projectSchema.index({ members: 1 })
projectSchema.index({ deadline: 1 })

export const Project = mongoose.model<IProject>('Project', projectSchema)

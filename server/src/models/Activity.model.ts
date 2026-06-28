import mongoose, { Schema } from 'mongoose'
import type { IActivity } from '../types'

const activitySchema = new Schema<IActivity>(
  {
    action: {
      type: String,
      enum: [
        'project_created',
        'task_created',
        'task_updated',
        'task_moved',
        'comment_added',
        'user_joined',
      ],
      required: true,
    },
    actor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    task: { type: Schema.Types.ObjectId, ref: 'Task' },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    message: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

activitySchema.index({ project: 1, createdAt: -1 })
activitySchema.index({ actor: 1, createdAt: -1 })

export const Activity = mongoose.model<IActivity>('Activity', activitySchema)

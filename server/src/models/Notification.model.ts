import mongoose, { Schema } from 'mongoose'
import type { INotification } from '../types'

const notificationSchema = new Schema<INotification>(
  {
    type: {
      type: String,
      enum: ['task_assigned', 'task_updated', 'comment_added', 'project_invite'],
      required: true,
    },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
)

notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 })

export const Notification = mongoose.model<INotification>('Notification', notificationSchema)

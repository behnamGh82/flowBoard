import mongoose, { Schema } from 'mongoose'
import type { IComment } from '../types'

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true, trim: true },
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

commentSchema.index({ task: 1, createdAt: -1 })

export const Comment = mongoose.model<IComment>('Comment', commentSchema)

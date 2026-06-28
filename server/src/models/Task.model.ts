import mongoose, { Schema } from 'mongoose'
import type { ITask } from '../types'

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'in_review', 'done'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['lowest', 'low', 'medium', 'high', 'highest'],
      default: 'medium',
    },
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    columnId: { type: String, required: true, default: 'todo' },
    order: { type: Number, default: 0 },
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    labels: [{ type: String }],
    dueDate: { type: Date },
  },
  { timestamps: true },
)

taskSchema.index({ board: 1, columnId: 1, order: 1 })
taskSchema.index({ project: 1 })

export const Task = mongoose.model<ITask>('Task', taskSchema)

import mongoose, { Schema } from 'mongoose'
import type { ITask } from '../types'

const attachmentSchema = new Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

const checklistItemSchema = new Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false },
)

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ['backlog', 'todo', 'in_progress', 'in_review', 'done'],
      default: 'backlog',
    },
    priority: {
      type: String,
      enum: ['lowest', 'low', 'medium', 'high', 'highest'],
      default: 'medium',
    },
    storyPoints: { type: Number, min: 0 },
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    columnId: { type: String, required: true, default: 'backlog' },
    order: { type: Number, default: 0 },
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    labels: [{ type: String }],
    dueDate: { type: Date },
    attachments: { type: [attachmentSchema], default: [] },
    checklist: { type: [checklistItemSchema], default: [] },
  },
  { timestamps: true },
)

taskSchema.index({ board: 1, columnId: 1, order: 1 })
taskSchema.index({ project: 1 })
taskSchema.index({ dueDate: 1 })

export const Task = mongoose.model<ITask>('Task', taskSchema)

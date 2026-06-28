import mongoose, { Schema } from 'mongoose'
import type { IBoard } from '../types'

const columnSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false },
)

const defaultColumns = [
  { id: 'todo', title: 'To Do', order: 0 },
  { id: 'in_progress', title: 'In Progress', order: 1 },
  { id: 'in_review', title: 'In Review', order: 2 },
  { id: 'done', title: 'Done', order: 3 },
]

const boardSchema = new Schema<IBoard>(
  {
    name: { type: String, required: true, trim: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    columns: { type: [columnSchema], default: defaultColumns },
  },
  { timestamps: true },
)

export const Board = mongoose.model<IBoard>('Board', boardSchema)

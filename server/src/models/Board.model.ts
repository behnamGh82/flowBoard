import mongoose, { Schema } from 'mongoose'
import type { IBoard } from '../types'
import { DEFAULT_BOARD_COLUMNS } from '../constants/board'

const columnSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false },
)

const boardSchema = new Schema<IBoard>(
  {
    name: { type: String, required: true, trim: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    columns: { type: [columnSchema], default: DEFAULT_BOARD_COLUMNS },
  },
  { timestamps: true },
)

export const Board = mongoose.model<IBoard>('Board', boardSchema)

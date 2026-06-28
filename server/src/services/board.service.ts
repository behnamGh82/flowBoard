import { Board } from '../models'
import { AppError } from '../middleware/error.middleware'

export const boardService = {
  getByProject: async (projectId: string) => {
    return Board.find({ project: projectId }).sort({ createdAt: -1 })
  },

  getById: async (id: string) => {
    const board = await Board.findById(id).populate('project', 'name key')
    if (!board) throw new AppError('Board not found', 404)
    return board
  },

  create: async (payload: { name: string; project: string }) => {
    return Board.create(payload)
  },
}

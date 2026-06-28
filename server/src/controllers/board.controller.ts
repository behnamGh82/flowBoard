import { Response, NextFunction } from 'express'
import { boardService } from '../services/board.service'
import { sendSuccess } from '../services/auth.service'
import { getParam } from '../utils/params'
import type { AuthRequest } from '../types'

export const boardController = {
  getByProject: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const boards = await boardService.getByProject(getParam(req.params.projectId))
      sendSuccess(res, boards)
    } catch (error) {
      next(error)
    }
  },

  getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const board = await boardService.getById(getParam(req.params.id))
      sendSuccess(res, board)
    } catch (error) {
      next(error)
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const board = await boardService.create(req.body)
      sendSuccess(res, board, 201)
    } catch (error) {
      next(error)
    }
  },
}

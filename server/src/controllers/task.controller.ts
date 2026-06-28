import { Response, NextFunction } from 'express'
import { taskService } from '../services/task.service'
import { sendSuccess } from '../services/auth.service'
import { getParam } from '../utils/params'
import type { AuthRequest } from '../types'

export const taskController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { board, project, page, limit } = req.query
      const result = await taskService.getAll({
        board: board as string,
        project: project as string,
        page: Number(page) || 1,
        limit: Number(limit) || 20,
      })
      sendSuccess(res, result)
    } catch (error) {
      next(error)
    }
  },

  getByBoard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const tasks = await taskService.getByBoard(getParam(req.params.boardId))
      sendSuccess(res, tasks)
    } catch (error) {
      next(error)
    }
  },

  getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await taskService.getById(getParam(req.params.id))
      sendSuccess(res, task)
    } catch (error) {
      next(error)
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await taskService.create(req.user!.id, req.body)
      sendSuccess(res, task, 201)
    } catch (error) {
      next(error)
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await taskService.update(getParam(req.params.id), req.body)
      sendSuccess(res, task)
    } catch (error) {
      next(error)
    }
  },

  move: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { columnId, order } = req.body
      const task = await taskService.move(getParam(req.params.id), columnId, order)
      sendSuccess(res, task)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await taskService.delete(getParam(req.params.id))
      sendSuccess(res, null, 204)
    } catch (error) {
      next(error)
    }
  },
}

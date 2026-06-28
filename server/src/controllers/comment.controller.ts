import { Response, NextFunction } from 'express'
import { commentService } from '../services/comment.service'
import { sendSuccess } from '../services/auth.service'
import { getParam } from '../utils/params'
import type { AuthRequest } from '../types'

export const commentController = {
  getByTask: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const comments = await commentService.getByTask(getParam(req.params.taskId))
      sendSuccess(res, comments)
    } catch (error) {
      next(error)
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const comment = await commentService.create(req.user!.id, req.body.content, req.body.task)
      sendSuccess(res, comment, 201)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await commentService.delete(getParam(req.params.id), req.user!.id)
      sendSuccess(res, null, 204)
    } catch (error) {
      next(error)
    }
  },
}

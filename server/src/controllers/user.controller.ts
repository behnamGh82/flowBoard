import { Response, NextFunction } from 'express'
import { userService } from '../services/user.service'
import { sendSuccess } from '../services/auth.service'
import { getParam } from '../utils/params'
import type { AuthRequest } from '../types'

export const userController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { search, page, limit } = req.query
      const result = await userService.getAll(
        search as string | undefined,
        Number(page) || 1,
        Number(limit) || 20,
      )
      sendSuccess(res, result)
    } catch (error) {
      next(error)
    }
  },

  getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getById(getParam(req.params.id))
      sendSuccess(res, user)
    } catch (error) {
      next(error)
    }
  },

  getOptions: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { search, limit } = req.query
      const users = await userService.getOptions(
        search as string | undefined,
        Number(limit) || 20,
      )
      sendSuccess(res, users)
    } catch (error) {
      next(error)
    }
  },
}

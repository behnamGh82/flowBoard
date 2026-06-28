import { Response, NextFunction } from 'express'
import { notificationService } from '../services/notification.service'
import { sendSuccess } from '../services/auth.service'
import { getParam } from '../utils/params'
import type { AuthRequest } from '../types'

export const notificationController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { unreadOnly, page, limit } = req.query
      const result = await notificationService.getAll(
        req.user!.id,
        unreadOnly === 'true',
        Number(page) || 1,
        Number(limit) || 20,
      )
      sendSuccess(res, result)
    } catch (error) {
      next(error)
    }
  },

  markAsRead: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationService.markAsRead(getParam(req.params.id), req.user!.id)
      sendSuccess(res, notification)
    } catch (error) {
      next(error)
    }
  },

  markAllAsRead: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await notificationService.markAllAsRead(req.user!.id)
      sendSuccess(res, null)
    } catch (error) {
      next(error)
    }
  },
}

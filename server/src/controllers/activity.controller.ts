import { Response, NextFunction } from 'express'
import { activityService } from '../services/activity.service'
import { sendSuccess } from '../services/auth.service'
import type { AuthRequest } from '../types'

export const activityController = {
  getTimeline: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { page, limit, project } = req.query
      const timeline = await activityService.getTimeline(req.user!.id, {
        page: Number(page) || 1,
        limit: Number(limit) || 20,
        project: typeof project === 'string' ? project : undefined,
      })

      sendSuccess(res, timeline)
    } catch (error) {
      next(error)
    }
  },
}

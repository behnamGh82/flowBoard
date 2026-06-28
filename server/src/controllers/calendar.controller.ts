import { Response, NextFunction } from 'express'
import { calendarService } from '../services/calendar.service'
import { sendSuccess } from '../services/auth.service'
import type { AuthRequest } from '../types'

const parseDate = (value: unknown) =>
  typeof value === 'string' && value ? new Date(value) : undefined

export const calendarController = {
  getEvents: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const events = await calendarService.getEvents(req.user!.id, {
        start: parseDate(req.query.start),
        end: parseDate(req.query.end),
        project: typeof req.query.project === 'string' ? req.query.project : undefined,
      })

      sendSuccess(res, events)
    } catch (error) {
      next(error)
    }
  },
}

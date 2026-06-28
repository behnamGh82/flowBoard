import { Router } from 'express'
import { calendarController } from '../controllers/calendar.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.use(authenticate)
router.get('/events', calendarController.getEvents)

export default router

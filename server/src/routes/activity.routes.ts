import { Router } from 'express'
import { activityController } from '../controllers/activity.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.use(authenticate)
router.get('/', activityController.getTimeline)

export default router

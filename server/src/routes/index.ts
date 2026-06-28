import { Router } from 'express'
import authRoutes from './auth.routes'
import projectRoutes from './project.routes'
import boardRoutes from './board.routes'
import taskRoutes from './task.routes'
import commentRoutes from './comment.routes'
import userRoutes from './user.routes'
import notificationRoutes from './notification.routes'

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'FlowBoard API is running' })
})

router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/boards', boardRoutes)
router.use('/tasks', taskRoutes)
router.use('/comments', commentRoutes)
router.use('/users', userRoutes)
router.use('/notifications', notificationRoutes)

export default router

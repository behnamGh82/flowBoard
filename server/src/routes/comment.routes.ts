import { Router } from 'express'
import { commentController } from '../controllers/comment.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.use(authenticate)
router.get('/', commentController.getAll)
router.get('/task/:taskId', commentController.getByTask)
router.post('/', commentController.create)
router.delete('/:id', commentController.delete)

export default router

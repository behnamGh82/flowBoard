import { Router } from 'express'
import { boardController } from '../controllers/board.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.use(authenticate)
router.get('/project/:projectId', boardController.getByProject)
router.get('/:id', boardController.getById)
router.post('/', boardController.create)

export default router

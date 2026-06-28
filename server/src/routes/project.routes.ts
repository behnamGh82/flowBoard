import { Router } from 'express'
import { projectController } from '../controllers/project.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.use(authenticate)
router.get('/', projectController.getAll)
router.get('/:id', projectController.getById)
router.post('/', projectController.create)
router.put('/:id', projectController.update)
router.post('/:id/archive', projectController.archive)
router.post('/:id/duplicate', projectController.duplicate)
router.delete('/:id', projectController.delete)

export default router

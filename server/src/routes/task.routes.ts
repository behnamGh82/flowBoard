import { Router } from 'express'
import { taskController } from '../controllers/task.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.use(authenticate)
router.get('/', taskController.getAll)
router.get('/board/:boardId', taskController.getByBoard)
router.get('/:id', taskController.getById)
router.post('/', taskController.create)
router.put('/:id', taskController.update)
router.patch('/:id/move', taskController.move)
router.delete('/:id', taskController.delete)

export default router

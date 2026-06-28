import { Router } from 'express'
import { userController } from '../controllers/user.controller'
import { authenticate, authorize } from '../middleware/auth.middleware'
import { ROLE_GROUPS } from '../constants/roles'

const router = Router()

router.use(authenticate)
router.get('/', authorize(...ROLE_GROUPS.ADMIN_ONLY), userController.getAll)
router.get('/:id', authorize(...ROLE_GROUPS.ADMIN_ONLY), userController.getById)

export default router

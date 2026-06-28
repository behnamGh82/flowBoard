import type { UserRole } from '@/types'

export const roleKeys: Record<UserRole, string> = {
  admin: 'admin',
  project_manager: 'project_manager',
  developer: 'developer',
}

import type { UserRole } from '../types'

export const ROLES = {
  ADMIN: 'admin',
  PROJECT_MANAGER: 'project_manager',
  DEVELOPER: 'developer',
} as const satisfies Record<string, UserRole>

export const ROLE_GROUPS = {
  ADMIN_ONLY: [ROLES.ADMIN],
  MANAGEMENT: [ROLES.ADMIN, ROLES.PROJECT_MANAGER],
  DELIVERY: [ROLES.ADMIN, ROLES.PROJECT_MANAGER, ROLES.DEVELOPER],
} satisfies Record<string, UserRole[]>

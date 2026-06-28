import type { UserRole } from '@/types'

export const roles = {
  admin: 'admin',
  projectManager: 'project_manager',
  developer: 'developer',
} as const satisfies Record<string, UserRole>

export const routePermissions = {
  adminOnly: [roles.admin],
  management: [roles.admin, roles.projectManager],
  delivery: [roles.admin, roles.projectManager, roles.developer],
} satisfies Record<string, UserRole[]>

import type { UserRole } from '@/types'

export const hasAnyRole = (userRole: UserRole | undefined, allowedRoles: UserRole[]) =>
  !!userRole && allowedRoles.includes(userRole)

export const roleLabels: Record<UserRole, string> = {
  admin: 'Admin',
  project_manager: 'Project Manager',
  developer: 'Developer',
}

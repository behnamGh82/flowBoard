import { useAuthStore } from '@/contexts/authStore'
import type { UserRole } from '@/types'

export const useHasRole = (roles: UserRole[]) => {
  const hasRole = useAuthStore((state) => state.hasRole)
  return hasRole(roles)
}

export const useUserRole = () => useAuthStore((state) => state.user?.role)

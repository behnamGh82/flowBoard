import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/contexts/authStore'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import type { UserRole } from '@/types'

interface ProtectedRouteProps {
  children?: React.ReactNode
  allowedRoles?: UserRole[]
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, hasRole } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles?.length && (!user || !hasRole(allowedRoles))) {
    return <Navigate to="/unauthorized" replace />
  }

  return children ?? <Outlet />
}

export const PublicRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children ?? <Outlet />
}

export const SuspenseFallback = () => <LoadingSpinner fullScreen />

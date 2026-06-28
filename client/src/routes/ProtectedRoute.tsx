import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/contexts/authStore'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import type { UserRole } from '@/types'
import { routePermissions } from '@/routes/roles'

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

export const AdminRoute = ({ children }: ProtectedRouteProps) => (
  <ProtectedRoute allowedRoles={routePermissions.adminOnly}>
    {children ?? <Outlet />}
  </ProtectedRoute>
)

export const SuspenseFallback = () => <LoadingScreen />

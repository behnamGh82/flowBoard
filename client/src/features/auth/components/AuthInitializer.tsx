import { useEffect } from 'react'
import { useAuthStore } from '@/contexts/authStore'
import { useCurrentUser } from '@/features/auth/hooks/useAuth'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, setUser, logout } = useAuthStore()
  const { data, isLoading, isError } = useCurrentUser()

  useEffect(() => {
    if (data) setUser(data)
  }, [data, setUser])

  useEffect(() => {
    if (isError) logout()
  }, [isError, logout])

  if (isAuthenticated && isLoading) {
    return <LoadingSpinner fullScreen />
  }

  return children
}

import { useMutation, useQuery } from '@tanstack/react-query'
import { authService } from '@/features/auth/services/auth.service'
import { useAuthStore } from '@/contexts/authStore'
import type {
  ForgotPasswordPayload,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordPayload,
} from '@/types'

export const useLogin = () => {
  const { setUser, setToken } = useAuthStore()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: ({ user, tokens }) => {
      setToken(tokens.accessToken)
      setUser(user)
    },
  })
}

export const useRegister = () => {
  const { setUser, setToken } = useAuthStore()

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authService.register(credentials),
    onSuccess: ({ user, tokens }) => {
      setToken(tokens.accessToken)
      setUser(user)
    },
  })
}

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuthStore()

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getMe,
    enabled: isAuthenticated,
  })
}

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => authService.forgotPassword(payload),
  })

export const useResetPassword = () =>
  useMutation({
    mutationFn: (payload: ResetPasswordPayload) => authService.resetPassword(payload),
  })

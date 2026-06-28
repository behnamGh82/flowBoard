import { apiClient } from '@/api/client'
import type {
  ApiResponse,
  AuthTokens,
  ForgotPasswordPayload,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordPayload,
  User,
} from '@/types'

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      '/auth/login',
      credentials,
    )
    return data.data
  },

  register: async (credentials: RegisterCredentials) => {
    const { data } = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      '/auth/register',
      credentials,
    )
    return data.data
  },

  getMe: async () => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/me')
    return data.data
  },

  forgotPassword: async (payload: ForgotPasswordPayload) => {
    const { data } = await apiClient.post<ApiResponse<{ resetToken?: string }>>(
      '/auth/forgot-password',
      payload,
    )
    return data.data
  },

  resetPassword: async (payload: ResetPasswordPayload) => {
    const { data } = await apiClient.post<ApiResponse<null>>(
      '/auth/reset-password',
      payload,
    )
    return data.data
  },
}

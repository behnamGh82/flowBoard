import { apiClient } from '@/api/client'
import type { ApiResponse, AuthTokens, LoginCredentials, RegisterCredentials, User } from '@/types'

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
}

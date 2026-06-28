import { apiClient } from '@/api/client'
import type { ApiResponse, PaginatedResponse, User } from '@/types'

export const userService = {
  getAll: async (params?: { page?: number; search?: string }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(
      '/users',
      { params },
    )
    return data.data
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`)
    return data.data
  },

  getOptions: async (params?: { search?: string; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<User[]>>('/users/options', { params })
    return data.data
  },
}

import { apiClient } from '@/api/client'
import type { ApiResponse, Notification, PaginatedResponse } from '@/types'

export const notificationService = {
  getAll: async (params?: { page?: number; unreadOnly?: boolean }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>(
      '/notifications',
      { params },
    )
    return data.data
  },

  markAsRead: async (id: string) => {
    const { data } = await apiClient.patch<ApiResponse<Notification>>(
      `/notifications/${id}/read`,
    )
    return data.data
  },

  markAllAsRead: async () => {
    await apiClient.patch('/notifications/read-all')
  },
}

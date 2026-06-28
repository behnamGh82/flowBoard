import { apiClient } from '@/api/client'
import type { ActivityTimelineItem, ApiResponse, PaginatedResponse } from '@/types'

export const activityService = {
  getTimeline: async (params?: { page?: number; project?: string }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ActivityTimelineItem>>>(
      '/activity',
      { params },
    )
    return data.data
  },
}

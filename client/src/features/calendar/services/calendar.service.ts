import { apiClient } from '@/api/client'
import type { ApiResponse, CalendarEvent } from '@/types'

export const calendarService = {
  getEvents: async (params?: { start?: string; end?: string; project?: string }) => {
    const { data } = await apiClient.get<ApiResponse<CalendarEvent[]>>('/calendar/events', {
      params,
    })
    return data.data
  },
}

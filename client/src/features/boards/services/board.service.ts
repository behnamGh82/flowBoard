import { apiClient } from '@/api/client'
import type { ApiResponse, Board } from '@/types'

export const boardService = {
  getByProject: async (projectId: string) => {
    const { data } = await apiClient.get<ApiResponse<Board[]>>(
      `/boards/project/${projectId}`,
    )
    return data.data
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Board>>(`/boards/${id}`)
    return data.data
  },

  create: async (payload: { name: string; project: string }) => {
    const { data } = await apiClient.post<ApiResponse<Board>>('/boards', payload)
    return data.data
  },
}

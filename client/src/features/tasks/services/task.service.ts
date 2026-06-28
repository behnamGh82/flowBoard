import { apiClient } from '@/api/client'
import type { ApiResponse, PaginatedResponse, Task } from '@/types'
import type { CreateTaskPayload } from '@/features/tasks/schemas/task.schema'

export const taskService = {
  getAll: async (params?: { board?: string; project?: string; page?: number }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Task>>>(
      '/tasks',
      { params },
    )
    return data.data
  },

  getByBoard: async (boardId: string) => {
    const { data } = await apiClient.get<ApiResponse<Task[]>>(`/tasks/board/${boardId}`)
    return data.data
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`)
    return data.data
  },

  create: async (payload: CreateTaskPayload) => {
    const { data } = await apiClient.post<ApiResponse<Task>>('/tasks', payload)
    return data.data
  },

  update: async (id: string, payload: Partial<CreateTaskPayload>) => {
    const { data } = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, payload)
    return data.data
  },

  move: async (id: string, payload: { columnId: string; order: number }) => {
    const { data } = await apiClient.patch<ApiResponse<Task>>(`/tasks/${id}/move`, payload)
    return data.data
  },

  delete: async (id: string) => {
    await apiClient.delete(`/tasks/${id}`)
  },
}

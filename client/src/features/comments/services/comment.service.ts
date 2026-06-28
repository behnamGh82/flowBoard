import { apiClient } from '@/api/client'
import type { ApiResponse, Comment } from '@/types'

export const commentService = {
  getByTask: async (taskId: string) => {
    const { data } = await apiClient.get<ApiResponse<Comment[]>>(`/comments/task/${taskId}`)
    return data.data
  },

  create: async (payload: { content: string; task: string }) => {
    const { data } = await apiClient.post<ApiResponse<Comment>>('/comments', payload)
    return data.data
  },

  delete: async (id: string) => {
    await apiClient.delete(`/comments/${id}`)
  },
}

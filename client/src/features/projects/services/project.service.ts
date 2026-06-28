import { apiClient } from '@/api/client'
import type { ApiResponse, PaginatedResponse, Project } from '@/types'
import type { ProjectFormValues } from '@/features/projects/schemas/project.schema'

export const projectService = {
  getAll: async (params?: { page?: number; search?: string }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Project>>>(
      '/projects',
      { params },
    )
    return data.data
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`)
    return data.data
  },

  create: async (payload: ProjectFormValues) => {
    const { data } = await apiClient.post<ApiResponse<Project>>('/projects', payload)
    return data.data
  },

  update: async (id: string, payload: Partial<ProjectFormValues>) => {
    const { data } = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, payload)
    return data.data
  },

  delete: async (id: string) => {
    await apiClient.delete(`/projects/${id}`)
  },
}

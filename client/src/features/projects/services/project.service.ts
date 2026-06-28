import { apiClient } from '@/api/client'
import type { ApiResponse, PaginatedResponse, Project } from '@/types'
import type { ProjectListParams } from '@/constants/project'
import type { ProjectFormValues } from '@/features/projects/schemas/project.schema'
import { formValuesToPayload } from '@/features/projects/schemas/project.schema'

export const projectService = {
  getAll: async (params?: ProjectListParams) => {
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
    const { data } = await apiClient.post<ApiResponse<Project>>(
      '/projects',
      formValuesToPayload(payload),
    )
    return data.data
  },

  update: async (id: string, payload: Partial<ProjectFormValues>) => {
    const { data } = await apiClient.put<ApiResponse<Project>>(
      `/projects/${id}`,
      formValuesToPayload(payload as ProjectFormValues),
    )
    return data.data
  },

  archive: async (id: string) => {
    const { data } = await apiClient.post<ApiResponse<Project>>(`/projects/${id}/archive`)
    return data.data
  },

  duplicate: async (id: string) => {
    const { data } = await apiClient.post<ApiResponse<Project>>(`/projects/${id}/duplicate`)
    return data.data
  },

  delete: async (id: string) => {
    await apiClient.delete(`/projects/${id}`)
  },
}

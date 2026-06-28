import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { projectService } from '@/features/projects/services/project.service'
import { boardKeys } from '@/features/boards/hooks/useBoards'
import type { ProjectListParams } from '@/constants/project'
import type { ProjectFormValues } from '@/features/projects/schemas/project.schema'

export const projectKeys = {
  all: ['projects'] as const,
  list: (params?: ProjectListParams) => [...projectKeys.all, 'list', params] as const,
  detail: (id: string) => [...projectKeys.all, 'detail', id] as const,
}

export const useProjects = (params?: ProjectListParams) =>
  useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => projectService.getAll(params),
  })

export const useProject = (id: string) =>
  useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectService.getById(id),
    enabled: !!id,
  })

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ProjectFormValues) => projectService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      queryClient.invalidateQueries({ queryKey: boardKeys.all })
    },
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProjectFormValues> }) =>
      projectService.update(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) })
    },
  })
}

export const useArchiveProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => projectService.archive(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.all }),
  })
}

export const useDuplicateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => projectService.duplicate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      queryClient.invalidateQueries({ queryKey: boardKeys.all })
    },
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => projectService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      queryClient.invalidateQueries({ queryKey: boardKeys.all })
    },
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { boardService } from '@/features/boards/services/board.service'

export const boardKeys = {
  all: ['boards'] as const,
  byProject: (projectId: string) => [...boardKeys.all, 'project', projectId] as const,
  detail: (id: string) => [...boardKeys.all, 'detail', id] as const,
}

export const useBoardsByProject = (projectId: string) =>
  useQuery({
    queryKey: boardKeys.byProject(projectId),
    queryFn: () => boardService.getByProject(projectId),
    enabled: !!projectId,
  })

export const useBoard = (id: string) =>
  useQuery({
    queryKey: boardKeys.detail(id),
    queryFn: () => boardService.getById(id),
    enabled: !!id,
  })

export const useCreateBoard = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: boardService.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: boardKeys.byProject(variables.project) })
    },
  })
}

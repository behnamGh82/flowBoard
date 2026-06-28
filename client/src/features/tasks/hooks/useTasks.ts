import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/features/tasks/services/task.service'
import type { TaskFormValues } from '@/features/tasks/schemas/task.schema'

export const taskKeys = {
  all: ['tasks'] as const,
  list: (params?: Record<string, unknown>) => [...taskKeys.all, 'list', params] as const,
  byBoard: (boardId: string) => [...taskKeys.all, 'board', boardId] as const,
  detail: (id: string) => [...taskKeys.all, 'detail', id] as const,
}

export const useTasks = (params?: { board?: string; project?: string }) =>
  useQuery({
    queryKey: taskKeys.list(params),
    queryFn: () => taskService.getAll(params),
  })

export const useTasksByBoard = (boardId: string) =>
  useQuery({
    queryKey: taskKeys.byBoard(boardId),
    queryFn: () => taskService.getByBoard(boardId),
    enabled: !!boardId,
  })

export const useTask = (id: string) =>
  useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => taskService.getById(id),
    enabled: !!id,
  })

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: TaskFormValues) => taskService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  })
}

export const useMoveTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, columnId, order }: { id: string; columnId: string; order: number }) =>
      taskService.move(id, { columnId, order }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  })
}

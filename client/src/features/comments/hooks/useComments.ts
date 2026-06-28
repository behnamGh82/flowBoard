import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentService } from '@/features/comments/services/comment.service'

export const commentKeys = {
  all: ['comments'] as const,
  list: () => [...commentKeys.all, 'list'] as const,
  byTask: (taskId: string) => [...commentKeys.all, 'task', taskId] as const,
}

export const useComments = () =>
  useQuery({
    queryKey: commentKeys.list(),
    queryFn: commentService.getAll,
  })

export const useCommentsByTask = (taskId: string) =>
  useQuery({
    queryKey: commentKeys.byTask(taskId),
    queryFn: () => commentService.getByTask(taskId),
    enabled: !!taskId,
  })

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: commentService.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.byTask(variables.task) })
    },
  })
}

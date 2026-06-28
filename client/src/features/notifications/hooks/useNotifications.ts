import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '@/features/notifications/services/notification.service'

export const notificationKeys = {
  all: ['notifications'] as const,
  list: (params?: { unreadOnly?: boolean }) =>
    [...notificationKeys.all, 'list', params] as const,
}

export const useNotifications = (params?: { unreadOnly?: boolean }) =>
  useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => notificationService.getAll(params),
  })

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  })
}

import { useQuery } from '@tanstack/react-query'
import { activityService } from '@/features/activity/services/activity.service'

export const activityKeys = {
  all: ['activity'] as const,
  timeline: (params?: { page?: number; project?: string }) =>
    [...activityKeys.all, 'timeline', params] as const,
}

export const useActivityTimeline = (params?: { page?: number; project?: string }) =>
  useQuery({
    queryKey: activityKeys.timeline(params),
    queryFn: () => activityService.getTimeline(params),
  })

import { useQuery } from '@tanstack/react-query'
import { calendarService } from '@/features/calendar/services/calendar.service'

export const calendarKeys = {
  all: ['calendar'] as const,
  events: (params?: { start?: string; end?: string; project?: string }) =>
    [...calendarKeys.all, 'events', params] as const,
}

export const useCalendarEvents = (params?: {
  start?: string
  end?: string
  project?: string
}) =>
  useQuery({
    queryKey: calendarKeys.events(params),
    queryFn: () => calendarService.getEvents(params),
  })

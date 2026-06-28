import { useMemo } from 'react'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { useActivityTimeline } from '@/features/activity/hooks/useActivityTimeline'
import { useCalendarEvents } from '@/features/calendar/hooks/useCalendarEvents'
import dayjs from 'dayjs'

export const useDashboardData = () => {
  const { data: projectsData, isLoading: projectsLoading } = useProjects()
  const { data: tasksData, isLoading: tasksLoading } = useTasks()
  const { data: activityData, isLoading: activityLoading } = useActivityTimeline()
  const start = dayjs().startOf('month').toISOString()
  const end = dayjs().endOf('month').add(1, 'month').toISOString()
  const { data: calendarEvents, isLoading: calendarLoading } = useCalendarEvents({ start, end })

  const stats = useMemo(() => {
    const projects = projectsData?.data ?? []
    const tasks = tasksData?.data ?? []
    const activeProjects = projects.filter((p) => p.status === 'active').length
    const openTasks = tasks.filter((t) => t.status !== 'done').length
    const completed = tasks.filter((t) => t.status === 'done').length

    return {
      activeProjects,
      openTasks,
      teamMembers: projects.reduce((acc, p) => acc + (p.members?.length ?? 0), 0) || 0,
      completed,
    }
  }, [projectsData, tasksData])

  const recentTasks = useMemo(() => {
    const tasks = tasksData?.data ?? []
    return [...tasks]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
  }, [tasksData])

  const upcomingDeadlines = useMemo(() => {
    const tasks = tasksData?.data ?? []
    return tasks
      .filter((t) => t.dueDate && dayjs(t.dueDate).isAfter(dayjs().subtract(1, 'day')))
      .sort((a, b) => dayjs(a.dueDate).valueOf() - dayjs(b.dueDate).valueOf())
      .slice(0, 5)
  }, [tasksData])

  return {
    stats,
    recentTasks,
    upcomingDeadlines,
    recentActivity: activityData?.data ?? [],
    calendarEvents: calendarEvents ?? [],
    isLoading: projectsLoading || tasksLoading || activityLoading || calendarLoading,
  }
}

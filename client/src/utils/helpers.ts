import type { TaskPriority, TaskStatus } from '@/types'

export const priorityColors: Record<TaskPriority, string> = {
  lowest: '#94A3B8',
  low: '#38BDF8',
  medium: '#FBBF24',
  high: '#F97316',
  highest: '#EF4444',
}

export const statusLabels: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  todo: 'Todo',
  in_progress: 'In Progress',
  in_review: 'Review',
  done: 'Done',
}

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}…` : text

export const getUserName = (user: { name: string } | string | undefined) =>
  typeof user === 'object' && user ? user.name : undefined

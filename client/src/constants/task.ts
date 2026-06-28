import type { TaskPriority, TaskStatus } from '@/types'

export const TASK_STATUSES: TaskStatus[] = [
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done',
]

export const TASK_PRIORITIES: TaskPriority[] = [
  'lowest',
  'low',
  'medium',
  'high',
  'highest',
]

export const COLUMN_TO_STATUS: Record<string, TaskStatus> = {
  backlog: 'backlog',
  todo: 'todo',
  in_progress: 'in_progress',
  in_review: 'in_review',
  done: 'done',
}

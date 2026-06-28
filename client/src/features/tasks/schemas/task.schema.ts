import { z } from 'zod'
import type { TaskPriority, TaskStatus } from '@/types'
import { TASK_PRIORITIES, TASK_STATUSES } from '@/constants/task'

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(TASK_STATUSES as [TaskStatus, ...TaskStatus[]]),
  priority: z.enum(TASK_PRIORITIES as [TaskPriority, ...TaskPriority[]]),
  storyPoints: z.number().min(0).optional(),
  board: z.string(),
  project: z.string(),
  columnId: z.string(),
  assignee: z.string().optional(),
  labels: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
})

export type TaskFormValues = z.infer<typeof taskSchema>

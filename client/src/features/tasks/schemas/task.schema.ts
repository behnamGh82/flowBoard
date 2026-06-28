import { z } from 'zod'
import type { TFunction } from 'i18next'
import type { TaskPriority, TaskStatus } from '@/types'
import { TASK_PRIORITIES, TASK_STATUSES } from '@/constants/task'

export const createTaskSchema = (t: TFunction<'validation'>) =>
  z.object({
    title: z.string().min(1, t('titleRequired')),
    description: z.string().optional(),
    status: z.enum(TASK_STATUSES as [TaskStatus, ...TaskStatus[]]),
    priority: z.enum(TASK_PRIORITIES as [TaskPriority, ...TaskPriority[]]),
    storyPoints: z.string().optional(),
    board: z.string().min(1),
    project: z.string().min(1),
    columnId: z.string().min(1),
    assignee: z.string().optional(),
    labels: z.string().optional(),
    dueDate: z.string().optional(),
  })

export type TaskFormValues = z.infer<ReturnType<typeof createTaskSchema>>

export const parseTaskLabels = (labels?: string): string[] =>
  labels
    ? labels
        .split(',')
        .map((label) => label.trim())
        .filter(Boolean)
    : []

export const toTaskPayload = (values: TaskFormValues) => ({
  title: values.title,
  description: values.description,
  status: values.status,
  priority: values.priority,
  storyPoints: values.storyPoints ? Number(values.storyPoints) : undefined,
  board: values.board,
  project: values.project,
  columnId: values.columnId,
  assignee: values.assignee || undefined,
  labels: parseTaskLabels(values.labels),
  dueDate: values.dueDate || undefined,
})

export type CreateTaskPayload = ReturnType<typeof toTaskPayload>

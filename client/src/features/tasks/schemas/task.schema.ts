import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'in_review', 'done']),
  priority: z.enum(['lowest', 'low', 'medium', 'high', 'highest']),
  board: z.string(),
  project: z.string(),
  columnId: z.string(),
  assignee: z.string().optional(),
  labels: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
})

export type TaskFormValues = z.infer<typeof taskSchema>

import { z } from 'zod'
import type { TFunction } from 'i18next'
import {
  PROJECT_PRIORITIES,
  PROJECT_VISIBILITIES,
} from '@/constants/project'
import type { ProjectPriority, ProjectStatus, ProjectVisibility } from '@/types'

const FORM_PROJECT_STATUSES = ['planning', 'active', 'on_hold', 'completed'] as const

export const createProjectSchema = (t: TFunction<'validation'>) =>
  z.object({
    name: z.string().min(2, t('projectNameMin')),
    description: z.string().optional(),
    color: z.string().optional(),
    icon: z.string().optional(),
    startDate: z.string().optional(),
    deadline: z.string().optional(),
    visibility: z.enum(PROJECT_VISIBILITIES as [ProjectVisibility, ...ProjectVisibility[]]),
    priority: z.enum(PROJECT_PRIORITIES as [ProjectPriority, ...ProjectPriority[]]),
    status: z.enum(FORM_PROJECT_STATUSES),
    members: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
  })

export type ProjectFormValues = z.infer<ReturnType<typeof createProjectSchema>>

export const deriveProjectKey = (name: string): string =>
  name
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 6) || 'PRJ'

export const projectToFormValues = (project: {
  name: string
  description?: string
  color?: string
  icon?: string
  startDate?: string
  deadline?: string
  visibility?: ProjectVisibility
  priority?: ProjectPriority
  status?: ProjectStatus
  members?: Array<{ _id: string } | string>
  coverImage?: string
}): ProjectFormValues => ({
  name: project.name,
  description: project.description ?? '',
  color: project.color ?? '#4F46E5',
  icon: project.icon ?? '📋',
  startDate: project.startDate ? project.startDate.slice(0, 10) : '',
  deadline: project.deadline ? project.deadline.slice(0, 10) : '',
  visibility: project.visibility ?? 'team',
  priority: project.priority ?? 'medium',
  status: project.status === 'archived' ? 'on_hold' : (project.status ?? 'planning'),
  members: (project.members ?? []).map((member) =>
    typeof member === 'string' ? member : member._id,
  ),
  coverImage: project.coverImage ?? '',
})

export const formValuesToPayload = (values: Partial<ProjectFormValues>) => {
  const payload: Record<string, unknown> = {}
  if (values.name !== undefined) payload.name = values.name
  if (values.description !== undefined) payload.description = values.description || undefined
  if (values.color !== undefined) payload.color = values.color
  if (values.icon !== undefined) payload.icon = values.icon
  if (values.startDate !== undefined) payload.startDate = values.startDate || undefined
  if (values.deadline !== undefined) payload.deadline = values.deadline || undefined
  if (values.visibility !== undefined) payload.visibility = values.visibility
  if (values.priority !== undefined) payload.priority = values.priority
  if (values.status !== undefined) payload.status = values.status
  if (values.members !== undefined) payload.members = values.members
  if (values.coverImage !== undefined) payload.coverImage = values.coverImage || undefined
  return payload
}

export const getProjectProgress = (project: { totalTasks?: number; completedTasks?: number }) => {
  const total = project.totalTasks ?? 0
  const completed = project.completedTasks ?? 0
  if (!total) return 0
  return Math.round((completed / total) * 100)
}

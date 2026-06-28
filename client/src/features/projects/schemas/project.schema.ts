import { z } from 'zod'
import type { TFunction } from 'i18next'

export const createProjectSchema = (t: TFunction<'validation'>) =>
  z.object({
    name: z.string().min(2, t('projectNameMin')),
    key: z
      .string()
      .min(2, t('projectKeyMin'))
      .max(6, t('projectKeyMax'))
      .regex(/^[A-Z]+$/, t('projectKeyFormat')),
    description: z.string().optional(),
    color: z.string().optional(),
  })

export type ProjectFormValues = z.infer<ReturnType<typeof createProjectSchema>>

export const deriveProjectKey = (name: string): string =>
  name
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 6) || 'PRJ'

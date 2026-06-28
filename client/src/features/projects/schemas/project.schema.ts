import { z } from 'zod'

export const projectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  key: z
    .string()
    .min(2, 'Key must be at least 2 characters')
    .max(6, 'Key must be at most 6 characters')
    .regex(/^[A-Z]+$/, 'Key must be uppercase letters only'),
  description: z.string().optional(),
  color: z.string().optional(),
})

export type ProjectFormValues = z.infer<typeof projectSchema>

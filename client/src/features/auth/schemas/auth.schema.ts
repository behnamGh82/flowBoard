import { z } from 'zod'
import type { TFunction } from 'i18next'

export const createLoginSchema = (t: TFunction<'validation'>) =>
  z.object({
    email: z.email(t('invalidEmail')),
    password: z.string().min(6, t('passwordMin')),
  })

export const createRegisterSchema = (t: TFunction<'validation'>) =>
  z
    .object({
      name: z.string().min(2, t('nameMin')),
      email: z.email(t('invalidEmail')),
      role: z.enum(['admin', 'project_manager', 'developer']),
      password: z.string().min(6, t('passwordMin')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsMismatch'),
      path: ['confirmPassword'],
    })

export const createForgotPasswordSchema = (t: TFunction<'validation'>) =>
  z.object({
    email: z.email(t('invalidEmail')),
  })

export const createResetPasswordSchema = (t: TFunction<'validation'>) =>
  z
    .object({
      token: z.string().min(1, t('resetTokenRequired')),
      password: z.string().min(6, t('passwordMin')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsMismatch'),
      path: ['confirmPassword'],
    })

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>
export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>
export type ForgotPasswordFormValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>
export type ResetPasswordFormValues = z.infer<ReturnType<typeof createResetPasswordSchema>>

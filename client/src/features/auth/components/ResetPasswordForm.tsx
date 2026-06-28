import { useMemo } from 'react'
import { Alert, Box, Button, Link as MuiLink, TextField, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/features/auth/schemas/auth.schema'
import { useResetPassword } from '@/features/auth/hooks/useAuth'

export const ResetPasswordForm = () => {
  const { t } = useTranslation(['auth', 'validation'])
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const resetPassword = useResetPassword()
  const resetPasswordSchema = useMemo(() => createResetPasswordSchema(t), [t])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: searchParams.get('token') ?? '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const { confirmPassword: _, ...payload } = values
    await resetPassword.mutateAsync(payload)
    navigate('/login')
  })

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
        {t('auth:resetPasswordTitle')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('auth:resetPasswordDescription')}
      </Typography>

      {resetPassword.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t('auth:resetTokenInvalid')}
        </Alert>
      )}

      <TextField
        {...register('token')}
        label={t('auth:resetToken')}
        fullWidth
        margin="normal"
        error={!!errors.token}
        helperText={errors.token?.message}
      />
      <TextField
        {...register('password')}
        label={t('auth:newPassword')}
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        {...register('confirmPassword')}
        label={t('auth:confirmPassword')}
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{ mt: 3 }}
        loading={resetPassword.isPending}
      >
        {t('auth:updatePassword')}
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        <MuiLink component={Link} to="/login">
          {t('auth:backToSignIn')}
        </MuiLink>
      </Typography>
    </Box>
  )
}

import { useMemo } from 'react'
import { Alert, Box, Button, Link as MuiLink, TextField, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/schemas/auth.schema'
import { useForgotPassword } from '@/features/auth/hooks/useAuth'

export const ForgotPasswordForm = () => {
  const { t } = useTranslation(['auth', 'validation'])
  const forgotPassword = useForgotPassword()
  const forgotPasswordSchema = useMemo(() => createForgotPasswordSchema(t), [t])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = handleSubmit((values) => {
    forgotPassword.mutate(values)
  })

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
        {t('auth:forgotPasswordTitle')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('auth:forgotPasswordDescription')}
      </Typography>

      {forgotPassword.isSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {t('auth:resetSuccess')}
          {forgotPassword.data?.resetToken && (
            <Typography variant="caption" sx={{ mt: 1, display: 'block', wordBreak: 'break-all' }}>
              {t('auth:devResetToken')}: {forgotPassword.data.resetToken}
            </Typography>
          )}
        </Alert>
      )}

      {forgotPassword.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t('auth:resetRequestFailed')}
        </Alert>
      )}

      <TextField
        {...register('email')}
        label={t('auth:email')}
        type="email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{ mt: 3 }}
        loading={forgotPassword.isPending}
      >
        {t('auth:sendResetInstructions')}
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t('auth:rememberPassword')}{' '}
        <MuiLink component={Link} to="/login">
          {t('auth:signIn')}
        </MuiLink>
      </Typography>
    </Box>
  )
}

import { useMemo } from 'react'
import { Box, Button, TextField, Typography, Link as MuiLink, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  createLoginSchema,
  type LoginFormValues,
} from '@/features/auth/schemas/auth.schema'
import { useLogin } from '@/features/auth/hooks/useAuth'

export const LoginForm = () => {
  const { t } = useTranslation(['auth', 'validation'])
  const navigate = useNavigate()
  const login = useLogin()
  const loginSchema = useMemo(() => createLoginSchema(t), [t])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    await login.mutateAsync(values)
    navigate('/dashboard')
  })

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
        {t('auth:signIn')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('auth:signInDescription')}
      </Typography>

      {login.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t('auth:invalidCredentials')}
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
      <TextField
        {...register('password')}
        label={t('auth:password')}
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <MuiLink component={Link} to="/forgot-password" variant="body2">
          {t('auth:forgotPassword')}
        </MuiLink>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{ mt: 3 }}
        loading={login.isPending}
      >
        {t('auth:signIn')}
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t('auth:noAccount')}{' '}
        <MuiLink component={Link} to="/register">
          {t('auth:createOne')}
        </MuiLink>
      </Typography>
    </Box>
  )
}

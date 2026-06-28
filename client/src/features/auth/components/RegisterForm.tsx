import { useMemo } from 'react'
import {
  Alert,
  Box,
  Button,
  Link as MuiLink,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  createRegisterSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas/auth.schema'
import { useRegister } from '@/features/auth/hooks/useAuth'

export const RegisterForm = () => {
  const { t } = useTranslation(['auth', 'validation', 'roles'])
  const navigate = useNavigate()
  const registerMutation = useRegister()
  const registerSchema = useMemo(() => createRegisterSchema(t), [t])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'developer',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = handleSubmit(async (values: RegisterFormValues) => {
    const { confirmPassword: _, ...payload } = values
    await registerMutation.mutateAsync(payload)
    navigate('/dashboard')
  })

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
        {t('auth:createAccount')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('auth:createAccountDescription')}
      </Typography>

      {registerMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t('auth:registrationFailed')}
        </Alert>
      )}

      <TextField
        {...register('name')}
        label={t('auth:fullName')}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
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
        {...register('role')}
        select
        label={t('auth:role')}
        fullWidth
        margin="normal"
        error={!!errors.role}
        helperText={errors.role?.message}
      >
        <MenuItem value="developer">{t('roles:developer')}</MenuItem>
        <MenuItem value="project_manager">{t('roles:project_manager')}</MenuItem>
        <MenuItem value="admin">{t('roles:admin')}</MenuItem>
      </TextField>
      <TextField
        {...register('password')}
        label={t('auth:password')}
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
        loading={registerMutation.isPending}
      >
        {t('auth:createAccount')}
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t('auth:hasAccount')}{' '}
        <MuiLink component={Link} to="/login">
          {t('auth:signIn')}
        </MuiLink>
      </Typography>
    </Box>
  )
}

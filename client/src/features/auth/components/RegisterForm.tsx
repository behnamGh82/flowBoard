import { Box, Button, TextField, Typography, Link as MuiLink, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema, type RegisterFormValues } from '@/features/auth/schemas/auth.schema'
import { useRegister } from '@/features/auth/hooks/useAuth'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const registerMutation = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    const { confirmPassword: _, ...payload } = values
    await registerMutation.mutateAsync(payload)
    navigate('/dashboard')
  })

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
        Create account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Get started with your free workspace.
      </Typography>

      {registerMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Registration failed. Email may already be in use.
        </Alert>
      )}

      <TextField
        {...register('name')}
        label="Full name"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password')}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        {...register('confirmPassword')}
        label="Confirm password"
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
        Create account
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <MuiLink component={Link} to="/login">
          Sign in
        </MuiLink>
      </Typography>
    </Box>
  )
}

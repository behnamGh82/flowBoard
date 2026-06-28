import { Box, Button, TextField, Typography, Link as MuiLink, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/auth.schema'
import { useLogin } from '@/features/auth/hooks/useAuth'

export const LoginForm = () => {
  const navigate = useNavigate()
  const login = useLogin()

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
        Sign in
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back. Enter your credentials to continue.
      </Typography>

      {login.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Invalid email or password
        </Alert>
      )}

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

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{ mt: 3 }}
        loading={login.isPending}
      >
        Sign in
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don&apos;t have an account?{' '}
        <MuiLink component={Link} to="/register">
          Create one
        </MuiLink>
      </Typography>
    </Box>
  )
}

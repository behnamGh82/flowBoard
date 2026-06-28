import { Alert, Box, Button, Link as MuiLink, TextField, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/features/auth/schemas/auth.schema'
import { useResetPassword } from '@/features/auth/hooks/useAuth'

export const ResetPasswordForm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const resetPassword = useResetPassword()

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
        Reset password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose a new password for your account.
      </Typography>

      {resetPassword.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Invalid or expired reset token.
        </Alert>
      )}

      <TextField
        {...register('token')}
        label="Reset token"
        fullWidth
        margin="normal"
        error={!!errors.token}
        helperText={errors.token?.message}
      />
      <TextField
        {...register('password')}
        label="New password"
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
        loading={resetPassword.isPending}
      >
        Update password
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        <MuiLink component={Link} to="/login">
          Back to sign in
        </MuiLink>
      </Typography>
    </Box>
  )
}

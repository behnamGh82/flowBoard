import { Alert, Box, Button, Link as MuiLink, TextField, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/schemas/auth.schema'
import { useForgotPassword } from '@/features/auth/hooks/useAuth'

export const ForgotPasswordForm = () => {
  const forgotPassword = useForgotPassword()

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
        Forgot password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email and we will send password reset instructions.
      </Typography>

      {forgotPassword.isSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          If an account exists for this email, reset instructions have been prepared.
          {forgotPassword.data?.resetToken && (
            <Typography variant="caption" sx={{ mt: 1, display: 'block', wordBreak: 'break-all' }}>
              Development reset token: {forgotPassword.data.resetToken}
            </Typography>
          )}
        </Alert>
      )}

      {forgotPassword.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Unable to process password reset request.
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

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{ mt: 3 }}
        loading={forgotPassword.isPending}
      >
        Send reset instructions
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Remembered your password?{' '}
        <MuiLink component={Link} to="/login">
          Sign in
        </MuiLink>
      </Typography>
    </Box>
  )
}

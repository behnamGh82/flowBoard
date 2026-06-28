import { Box, Button, Typography } from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Unable to load data. Please try again.',
  onRetry,
}: ErrorStateProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 3,
      textAlign: 'center',
    }}
  >
    <ErrorOutlineOutlinedIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 360 }}>
      {message}
    </Typography>
    {onRetry && (
      <Button variant="contained" onClick={onRetry}>
        Retry
      </Button>
    )}
  </Box>
)

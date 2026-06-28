import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingScreenProps {
  message?: string
}

export const LoadingScreen = ({ message }: LoadingScreenProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: 2,
    }}
  >
    <CircularProgress size={48} />
    {message && (
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    )}
  </Box>
)

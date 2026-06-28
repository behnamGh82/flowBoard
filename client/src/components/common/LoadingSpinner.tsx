import { Box, CircularProgress } from '@mui/material'

interface LoadingSpinnerProps {
  fullScreen?: boolean
  size?: number
}

export const LoadingSpinner = ({ fullScreen = false, size = 40 }: LoadingSpinnerProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(fullScreen && { minHeight: '60vh' }),
    }}
  >
    <CircularProgress size={size} />
  </Box>
)

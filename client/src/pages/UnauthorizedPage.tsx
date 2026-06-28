import { Box, Button, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link } from 'react-router-dom'

export const UnauthorizedPage = () => (
  <Box
    sx={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      gap: 2,
    }}
  >
    <LockOutlinedIcon sx={{ fontSize: 56, color: 'warning.main' }} />
    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
      Access denied
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
      Your current role does not have permission to view this page.
    </Typography>
    <Button component={Link} to="/dashboard" variant="contained">
      Back to dashboard
    </Button>
  </Box>
)

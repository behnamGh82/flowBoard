import { Box, Container, Paper, Typography } from '@mui/material'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 2,
    }}
  >
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ViewKanbanOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          FlowBoard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Project management, simplified
        </Typography>
      </Box>
      <Paper sx={{ p: 4 }}>
        <Outlet />
      </Paper>
    </Container>
  </Box>
)

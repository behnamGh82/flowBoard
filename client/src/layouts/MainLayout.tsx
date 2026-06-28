import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Sidebar, DRAWER_WIDTH } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export const MainLayout = () => (
  <Box sx={{ display: 'flex', minHeight: '100vh' }}>
    <Sidebar />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        bgcolor: 'background.default',
      }}
    >
      <Header />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  </Box>
)

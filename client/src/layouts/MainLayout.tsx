import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Sidebar, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { useLayoutStore } from '@/contexts/layoutStore'

export const MainLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const sidebarCollapsed = useLayoutStore((s) => s.sidebarCollapsed)
  const sidebarWidth = isMobile ? 0 : sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${sidebarWidth}px)` },
          bgcolor: 'background.default',
          transition: theme.transitions.create('width'),
        }}
      >
        <Header />
        <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, md: 3 } }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

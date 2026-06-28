import { Box, Container, Paper, Typography } from '@mui/material'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'

export const AuthLayout = () => {
  const { t } = useTranslation('common')

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, insetInlineEnd: 16 }}>
        <LanguageSwitcher />
      </Box>

      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <ViewKanbanOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t('appName')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('appTagline')}
          </Typography>
        </Box>
        <Paper sx={{ p: 4 }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  )
}

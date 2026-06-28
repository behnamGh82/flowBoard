import { Box, Button, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const UnauthorizedPage = () => {
  const { t } = useTranslation('common')

  return (
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
        {t('accessDenied')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
        {t('accessDeniedDescription')}
      </Typography>
      <Button component={Link} to="/dashboard" variant="contained">
        {t('backToDashboard')}
      </Button>
    </Box>
  )
}

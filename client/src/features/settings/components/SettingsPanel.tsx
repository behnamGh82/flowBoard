import { Box, Typography, Switch, FormControlLabel, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useThemeMode } from '@/contexts/ThemeContext'

export const SettingsPanel = () => {
  const { t } = useTranslation('settings')
  const { mode, toggleMode } = useThemeMode()

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('appearance')}
      </Typography>
      <FormControlLabel
        control={<Switch checked={mode === 'dark'} onChange={toggleMode} />}
        label={t('darkMode')}
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        {t('notificationsSection')}
      </Typography>
      <FormControlLabel control={<Switch defaultChecked />} label={t('emailNotifications')} />
      <FormControlLabel control={<Switch defaultChecked />} label={t('taskAssignmentAlerts')} />
      <FormControlLabel control={<Switch />} label={t('weeklyDigest')} />
    </Box>
  )
}

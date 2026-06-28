import { Box, Typography, Switch, FormControlLabel, Divider } from '@mui/material'
import { useThemeMode } from '@/contexts/ThemeContext'

export const SettingsPanel = () => {
  const { mode, toggleMode } = useThemeMode()

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Appearance
      </Typography>
      <FormControlLabel
        control={<Switch checked={mode === 'dark'} onChange={toggleMode} />}
        label="Dark mode"
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>
      <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
      <FormControlLabel control={<Switch defaultChecked />} label="Task assignment alerts" />
      <FormControlLabel control={<Switch />} label="Weekly digest" />
    </Box>
  )
}

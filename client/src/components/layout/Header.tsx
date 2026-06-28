import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '@/contexts/ThemeContext'
import { useAuthStore } from '@/contexts/authStore'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { getInitials } from '@/utils/helpers'
import { roleKeys } from '@/features/auth/utils/roles'

export const Header = () => {
  const { t } = useTranslation(['common', 'roles'])
  const { mode, toggleMode } = useThemeMode()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: 'flex-end', gap: 1 }}>
        <LanguageSwitcher />

        <Tooltip title={mode === 'light' ? t('common:switchToDark') : t('common:switchToLight')}>
          <IconButton onClick={toggleMode} color="inherit">
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>

        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 14 }}>
            {user ? getInitials(user.name) : '?'}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {user && (
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2">{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="caption" color="primary.main" sx={{ display: 'block', mt: 0.5 }}>
                {t(`roles:${roleKeys[user.role]}`)}
              </Typography>
            </Box>
          )}
          <MenuItem
            onClick={() => {
              setAnchorEl(null)
              handleLogout()
            }}
          >
            <LogoutIcon fontSize="small" sx={{ me: 1 }} />
            {t('common:logout')}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

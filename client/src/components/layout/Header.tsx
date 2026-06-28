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
  Badge,
} from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useThemeMode } from '@/contexts/ThemeContext'
import { useAuthStore } from '@/contexts/authStore'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { SearchField } from '@/components/ui/SearchField'
import { getInitials } from '@/utils/helpers'
import { roleKeys } from '@/features/auth/utils/roles'
import { useNotifications } from '@/features/notifications/hooks/useNotifications'

export const Header = () => {
  const { t } = useTranslation(['common', 'roles', 'navigation'])
  const { mode, toggleMode } = useThemeMode()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [search, setSearch] = useState('')
  const { data: notifications } = useNotifications({ unreadOnly: true })

  const unreadCount = notifications?.data.filter((n) => !n.read).length ?? 0

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    if (value.trim()) navigate(`/tasks?search=${encodeURIComponent(value.trim())}`)
  }

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ flex: 1, maxWidth: 480, display: { xs: 'none', sm: 'block' } }}>
          <SearchField value={search} onChange={handleSearch} fullWidth />
        </Box>

        <Box sx={{ flex: 1, display: { xs: 'block', sm: 'none' } }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LanguageSwitcher />

          <Tooltip title={t('common:switchToDark')}>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={t('navigation:notifications')}>
            <IconButton color="inherit" component={Link} to="/notifications">
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 14 }}>
              {user ? getInitials(user.name) : '?'}
            </Avatar>
          </IconButton>
        </Box>

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
            <LogoutIcon fontSize="small" sx={{ marginInlineEnd: 1 }} />
            {t('common:logout')}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

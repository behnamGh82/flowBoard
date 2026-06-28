import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/contexts/authStore'
import { routePermissions } from '@/routes/roles'
import type { UserRole } from '@/types'

const DRAWER_WIDTH = 260

const navItems: Array<{
  label: string
  path: string
  icon: typeof DashboardOutlinedIcon
  allowedRoles?: UserRole[]
}> = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardOutlinedIcon },
  { label: 'Projects', path: '/projects', icon: FolderOutlinedIcon, allowedRoles: routePermissions.management },
  { label: 'Boards', path: '/boards', icon: ViewKanbanOutlinedIcon, allowedRoles: routePermissions.delivery },
  { label: 'Tasks', path: '/tasks', icon: TaskAltOutlinedIcon, allowedRoles: routePermissions.delivery },
  { label: 'Users', path: '/users', icon: PeopleOutlinedIcon, allowedRoles: routePermissions.adminOnly },
  { label: 'Notifications', path: '/notifications', icon: NotificationsOutlinedIcon },
  { label: 'Settings', path: '/settings', icon: SettingsOutlinedIcon, allowedRoles: routePermissions.adminOnly },
]

export const Sidebar = () => {
  const location = useLocation()
  const hasRole = useAuthStore((state) => state.hasRole)

  const visibleItems = navItems.filter(
    (item) => !item.allowedRoles || hasRole(item.allowedRoles),
  )

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ViewKanbanOutlinedIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
            FlowBoard
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {visibleItems.map(({ label, path, icon: Icon }) => {
          const active = location.pathname.startsWith(path)
          return (
            <ListItemButton
              key={path}
              component={NavLink}
              to={path}
              selected={active}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  '&:hover': { bgcolor: 'primary.dark' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={label}
                slotProps={{ primary: { sx: { fontWeight: 500 } } }}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Drawer>
  )
}

export { DRAWER_WIDTH }

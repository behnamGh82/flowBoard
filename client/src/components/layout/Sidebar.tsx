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

const DRAWER_WIDTH = 260

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardOutlinedIcon },
  { label: 'Projects', path: '/projects', icon: FolderOutlinedIcon },
  { label: 'Boards', path: '/boards', icon: ViewKanbanOutlinedIcon },
  { label: 'Tasks', path: '/tasks', icon: TaskAltOutlinedIcon },
  { label: 'Users', path: '/users', icon: PeopleOutlinedIcon },
  { label: 'Notifications', path: '/notifications', icon: NotificationsOutlinedIcon },
  { label: 'Settings', path: '/settings', icon: SettingsOutlinedIcon },
]

export const Sidebar = () => {
  const location = useLocation()

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
        {navItems.map(({ label, path, icon: Icon }) => {
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

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/contexts/authStore'
import {
  useLayoutStore,
  SIDEBAR_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
} from '@/contexts/layoutStore'
import type { UserRole } from '@/types'
import { NAV_SECTIONS, type NavItem } from '@/constants/navigation'

const filterItems = (items: NavItem[], hasRole: (roles: UserRole[]) => boolean) =>
  items.filter((item) => !item.allowedRoles || hasRole(item.allowedRoles))

export const Sidebar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation(['navigation', 'common'])
  const location = useLocation()
  const hasRole = useAuthStore((state) => state.hasRole)
  const { sidebarCollapsed, mobileOpen, toggleSidebar, setMobileOpen } = useLayoutStore()

  const collapsed = !isMobile && sidebarCollapsed
  const width = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH

  const drawerContent = (
    <>
      <Toolbar
        sx={{
          px: collapsed ? 1 : 2,
          justifyContent: collapsed ? 'center' : 'space-between',
          minHeight: 64,
        }}
      >
        {!collapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ViewKanbanOutlinedIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
              {t('common:appName')}
            </Typography>
          </Box>
        )}
        {!isMobile && (
          <IconButton size="small" onClick={toggleSidebar}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Toolbar>
      <Divider />

      {NAV_SECTIONS.map((section) => {
        const items = filterItems(section.items, hasRole)
        if (!items.length) return null

        return (
          <Box key={section.sectionKey} sx={{ px: collapsed ? 0.5 : 1, py: 1 }}>
            {!collapsed && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ px: 1.5, py: 1, display: 'block', fontWeight: 700 }}
              >
                {t(`navigation:sections.${section.sectionKey}`)}
              </Typography>
            )}
            <List disablePadding>
              {items.map(({ labelKey, path, icon: Icon }) => {
                if (!path) return null
                const active = location.pathname.startsWith(path)

                const button = (
                  <ListItemButton
                    key={path}
                    component={NavLink}
                    to={path}
                    selected={active}
                    onClick={() => isMobile && setMobileOpen(false)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      px: collapsed ? 1 : 2,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                        '&:hover': { bgcolor: 'primary.dark' },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 40,
                        justifyContent: 'center',
                      }}
                    >
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={t(`navigation:${labelKey}`)}
                        slotProps={{ primary: { sx: { fontWeight: 500 } } }}
                      />
                    )}
                  </ListItemButton>
                )

                return collapsed ? (
                  <Tooltip key={path} title={t(`navigation:${labelKey}`)} placement="right">
                    {button}
                  </Tooltip>
                ) : (
                  button
                )
              })}
            </List>
          </Box>
        )
      })}
    </>
  )

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ position: 'fixed', top: 12, insetInlineStart: 12, zIndex: theme.zIndex.drawer + 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
      </>
    )
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width'),
          overflowX: 'hidden',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}

export { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH }

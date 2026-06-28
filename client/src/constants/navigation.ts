import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import type { SvgIconComponent } from '@mui/icons-material'
import type { UserRole } from '@/types'
import { routePermissions } from '@/routes/roles'

export interface NavItem {
  labelKey: string
  path?: string
  icon: SvgIconComponent
  allowedRoles?: UserRole[]
  children?: NavItem[]
}

export const NAV_SECTIONS: Array<{ sectionKey: string; items: NavItem[] }> = [
  {
    sectionKey: 'workspace',
    items: [
      { labelKey: 'dashboard', path: '/dashboard', icon: DashboardOutlinedIcon },
      {
        labelKey: 'projects',
        path: '/projects',
        icon: FolderOutlinedIcon,
        allowedRoles: routePermissions.management,
      },
      {
        labelKey: 'boards',
        path: '/boards',
        icon: ViewKanbanOutlinedIcon,
        allowedRoles: routePermissions.delivery,
      },
      {
        labelKey: 'tasks',
        path: '/tasks',
        icon: TaskAltOutlinedIcon,
        allowedRoles: routePermissions.delivery,
      },
      {
        labelKey: 'calendar',
        path: '/calendar',
        icon: EventOutlinedIcon,
        allowedRoles: routePermissions.delivery,
      },
    ],
  },
  {
    sectionKey: 'management',
    items: [
      {
        labelKey: 'reports',
        path: '/reports',
        icon: AssessmentOutlinedIcon,
        allowedRoles: routePermissions.management,
      },
      {
        labelKey: 'users',
        path: '/users',
        icon: PeopleOutlinedIcon,
        allowedRoles: routePermissions.adminOnly,
      },
      {
        labelKey: 'settings',
        path: '/settings',
        icon: SettingsOutlinedIcon,
        allowedRoles: routePermissions.adminOnly,
      },
    ],
  },
]

import { Grid } from '@mui/material'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { StatCard } from '@/components/ui/StatCard'
import { TaskOverviewChart } from '@/features/dashboard/components/TaskOverviewChart'
import { RecentActivity } from '@/features/dashboard/components/RecentActivity'

const stats = [
  { title: 'Active Projects', value: 12, icon: <FolderOutlinedIcon />, color: '#4F46E5' },
  { title: 'Open Tasks', value: 48, icon: <TaskAltOutlinedIcon />, color: '#0EA5E9' },
  { title: 'Team Members', value: 8, icon: <PeopleOutlinedIcon />, color: '#8B5CF6' },
  { title: 'Completed', value: 156, icon: <CheckCircleOutlineOutlinedIcon />, color: '#10B981' },
]

export const DashboardOverview = () => (
  <>
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {stats.map((stat) => (
        <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard {...stat} trend="+12% from last month" />
        </Grid>
      ))}
    </Grid>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <TaskOverviewChart />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <RecentActivity />
      </Grid>
    </Grid>
  </>
)

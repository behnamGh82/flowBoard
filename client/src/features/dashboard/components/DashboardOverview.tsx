import { Grid } from '@mui/material'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { useTranslation } from 'react-i18next'
import { StatCard } from '@/components/ui/StatCard'
import { TaskOverviewChart } from '@/features/dashboard/components/TaskOverviewChart'
import { RecentActivity } from '@/features/dashboard/components/RecentActivity'

export const DashboardOverview = () => {
  const { t } = useTranslation(['dashboard', 'common'])

  const stats = [
    { title: t('dashboard:activeProjects'), value: 12, icon: <FolderOutlinedIcon />, color: '#4F46E5' },
    { title: t('dashboard:openTasks'), value: 48, icon: <TaskAltOutlinedIcon />, color: '#0EA5E9' },
    { title: t('dashboard:teamMembers'), value: 8, icon: <PeopleOutlinedIcon />, color: '#8B5CF6' },
    { title: t('dashboard:completed'), value: 156, icon: <CheckCircleOutlineOutlinedIcon />, color: '#10B981' },
  ]

  return (
    <>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...stat} trend={t('common:trendFromLastMonth')} />
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
}

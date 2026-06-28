import { Grid } from '@mui/material'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { useTranslation } from 'react-i18next'
import { StatCard } from '@/components/ui/StatCard'
import { DashboardSkeleton } from '@/components/ui/SkeletonComponents'
import { TaskOverviewChart } from '@/features/dashboard/components/TaskOverviewChart'
import { RecentActivity } from '@/features/dashboard/components/RecentActivity'
import { RecentTasks } from '@/features/dashboard/components/RecentTasks'
import { UpcomingDeadlines } from '@/features/dashboard/components/RecentTasks'
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData'

export const DashboardOverview = () => {
  const { t } = useTranslation(['dashboard', 'common'])
  const { stats, recentTasks, upcomingDeadlines, isLoading } = useDashboardData()

  if (isLoading) return <DashboardSkeleton />

  const statCards = [
    { title: t('dashboard:activeProjects'), value: stats.activeProjects, icon: <FolderOutlinedIcon />, color: '#4F46E5' },
    { title: t('dashboard:openTasks'), value: stats.openTasks, icon: <TaskAltOutlinedIcon />, color: '#0EA5E9' },
    { title: t('dashboard:teamMembers'), value: stats.teamMembers, icon: <PeopleOutlinedIcon />, color: '#8B5CF6' },
    { title: t('dashboard:completed'), value: stats.completed, icon: <CheckCircleOutlineOutlinedIcon />, color: '#10B981' },
  ]

  return (
    <>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statCards.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...stat} trend={t('common:trendFromLastMonth')} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <TaskOverviewChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <UpcomingDeadlines tasks={upcomingDeadlines} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <RecentTasks tasks={recentTasks} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <RecentActivity />
        </Grid>
      </Grid>
    </>
  )
}

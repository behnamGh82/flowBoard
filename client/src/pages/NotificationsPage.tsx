import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'

export const NotificationsPage = () => (
  <>
    <PageHeader title="Notifications" subtitle="Stay updated on project activity" />
    <EmptyState
      title="All caught up"
      description="You have no new notifications."
      icon={<NotificationsOutlinedIcon fontSize="inherit" />}
    />
  </>
)

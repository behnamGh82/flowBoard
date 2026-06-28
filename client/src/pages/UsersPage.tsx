import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'

export const UsersPage = () => (
  <>
    <PageHeader title="Team" subtitle="Manage workspace members" />
    <EmptyState
      title="Team members"
      description="Invite team members to collaborate on projects."
      icon={<PeopleOutlinedIcon fontSize="inherit" />}
    />
  </>
)

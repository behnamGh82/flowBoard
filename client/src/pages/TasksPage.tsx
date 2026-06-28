import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'

export const TasksPage = () => (
  <>
    <PageHeader title="Tasks" subtitle="All tasks across your workspace" />
    <EmptyState
      title="No tasks to display"
      description="Tasks will appear here once you create them on a board."
      icon={<TaskAltOutlinedIcon fontSize="inherit" />}
    />
  </>
)

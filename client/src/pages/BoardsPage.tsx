import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'

export const BoardsPage = () => (
  <>
    <PageHeader title="Boards" subtitle="Kanban boards across your projects" />
    <EmptyState
      title="Select a project"
      description="Open a project to view and manage its boards."
      icon={<ViewKanbanOutlinedIcon fontSize="inherit" />}
    />
  </>
)

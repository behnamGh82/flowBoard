import { useTranslation } from 'react-i18next'
import { Chip } from '@mui/material'
import { AppTable, type AppTableColumn } from '@/components/ui/AppTable'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/common/EmptyState'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { statusLabels } from '@/utils/helpers'
import { formatDate } from '@/utils/formatDate'
import type { Task } from '@/types'

export const TaskListOverview = () => {
  const { t } = useTranslation('pages')
  const { data, isLoading, isError, refetch } = useTasks()

  if (isLoading) return <LoadingScreen />
  if (isError) return <ErrorState onRetry={() => refetch()} />

  const tasks = data?.data ?? []
  if (!tasks.length) {
    return (
      <EmptyState
        title={t('tasksEmptyTitle')}
        description={t('tasksEmptyDescription')}
      />
    )
  }

  const columns: AppTableColumn<Task>[] = [
    { id: 'title', label: 'Title', render: (row) => row.title },
    {
      id: 'status',
      label: 'Status',
      render: (row) => (
        <Chip label={statusLabels[row.status]} size="small" variant="outlined" />
      ),
    },
    { id: 'priority', label: 'Priority', render: (row) => row.priority },
    {
      id: 'storyPoints',
      label: 'SP',
      render: (row) => row.storyPoints ?? '-',
    },
    {
      id: 'dueDate',
      label: 'Due Date',
      render: (row) => (row.dueDate ? formatDate(row.dueDate) : '-'),
    },
  ]

  return (
    <AppTable
      columns={columns}
      rows={tasks}
      getRowId={(row) => row._id}
      emptyMessage={t('tasksEmptyTitle')}
    />
  )
}

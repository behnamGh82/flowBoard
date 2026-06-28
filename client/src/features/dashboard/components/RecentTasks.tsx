import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AppTable, type AppTableColumn } from '@/components/ui/AppTable'
import { statusLabels } from '@/utils/helpers'
import { formatDate, formatRelative } from '@/utils/formatDate'
import type { Task } from '@/types'

interface RecentTasksProps {
  tasks: Task[]
}

export const RecentTasks = ({ tasks }: RecentTasksProps) => {
  const { t } = useTranslation('dashboard')

  const columns: AppTableColumn<Task>[] = [
    { id: 'title', label: t('task'), render: (row) => row.title },
    { id: 'status', label: t('status'), render: (row) => statusLabels[row.status] },
    {
      id: 'updated',
      label: t('updated'),
      render: (row) => formatRelative(row.updatedAt),
    },
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('recentTasks')}
        </Typography>
        <AppTable columns={columns} rows={tasks} getRowId={(row) => row._id} emptyMessage={t('noRecentTasks')} />
      </CardContent>
    </Card>
  )
}

interface UpcomingDeadlinesProps {
  tasks: Task[]
}

export const UpcomingDeadlines = ({ tasks }: UpcomingDeadlinesProps) => {
  const { t } = useTranslation('dashboard')

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('upcomingDeadlines')}
        </Typography>
        <List disablePadding>
          {tasks.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {t('noUpcomingDeadlines')}
            </Typography>
          ) : (
            tasks.map((task) => (
              <ListItem key={task._id} disableGutters sx={{ py: 1 }}>
                <ListItemText
                  primary={task.title}
                  secondary={task.dueDate ? formatDate(task.dueDate) : undefined}
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  )
}

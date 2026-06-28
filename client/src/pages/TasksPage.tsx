import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'

export const TasksPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('tasksTitle')} subtitle={t('tasksSubtitle')} />
      <EmptyState
        title={t('tasksEmptyTitle')}
        description={t('tasksEmptyDescription')}
        icon={<TaskAltOutlinedIcon fontSize="inherit" />}
      />
    </>
  )
}

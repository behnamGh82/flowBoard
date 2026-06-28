import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { TaskListOverview } from '@/features/tasks/components/TaskListOverview'

export const TasksPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('tasksTitle')} subtitle={t('tasksSubtitle')} />
      <TaskListOverview />
    </>
  )
}

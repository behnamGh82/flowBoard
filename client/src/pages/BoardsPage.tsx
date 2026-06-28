import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'

export const BoardsPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('boardsTitle')} subtitle={t('boardsSubtitle')} />
      <EmptyState
        title={t('boardsEmptyTitle')}
        description={t('boardsEmptyDescription')}
        icon={<ViewKanbanOutlinedIcon fontSize="inherit" />}
      />
    </>
  )
}

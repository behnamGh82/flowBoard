import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { BoardWorkspace } from '@/features/boards/components/BoardWorkspace'

export const BoardsPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('boardsTitle')} subtitle={t('boardsSubtitle')} />
      <BoardWorkspace />
    </>
  )
}

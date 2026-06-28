import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { CommentsOverview } from '@/features/comments'

export const CommentsPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('commentsTitle')} subtitle={t('commentsSubtitle')} />
      <CommentsOverview />
    </>
  )
}

import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { ActivityTimelineList } from '@/features/activity'

export const ActivityTimelinePage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader
        title={t('activityTimelineTitle')}
        subtitle={t('activityTimelineSubtitle')}
      />
      <ActivityTimelineList />
    </>
  )
}

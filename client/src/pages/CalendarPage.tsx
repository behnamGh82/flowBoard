import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { CalendarOverview } from '@/features/calendar'

export const CalendarPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('calendarTitle')} subtitle={t('calendarSubtitle')} />
      <CalendarOverview />
    </>
  )
}

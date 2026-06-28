import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { DashboardOverview } from '@/features/dashboard'

export const DashboardPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('dashboardTitle')} subtitle={t('dashboardSubtitle')} />
      <DashboardOverview />
    </>
  )
}

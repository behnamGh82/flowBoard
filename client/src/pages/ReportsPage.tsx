import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'

export const ReportsPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('reportsTitle')} subtitle={t('reportsSubtitle')} />
      <EmptyState
        title={t('reportsEmptyTitle')}
        description={t('reportsEmptyDescription')}
        icon={<AssessmentOutlinedIcon fontSize="inherit" />}
      />
    </>
  )
}

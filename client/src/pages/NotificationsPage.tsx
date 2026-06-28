import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'

export const NotificationsPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('notificationsTitle')} subtitle={t('notificationsSubtitle')} />
      <EmptyState
        title={t('notificationsEmptyTitle')}
        description={t('notificationsEmptyDescription')}
        icon={<NotificationsOutlinedIcon fontSize="inherit" />}
      />
    </>
  )
}

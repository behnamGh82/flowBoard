import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'

export const UsersPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('usersTitle')} subtitle={t('usersSubtitle')} />
      <EmptyState
        title={t('usersEmptyTitle')}
        description={t('usersEmptyDescription')}
        icon={<PeopleOutlinedIcon fontSize="inherit" />}
      />
    </>
  )
}

import { Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { SettingsPanel } from '@/features/settings'

export const SettingsPage = () => {
  const { t } = useTranslation('pages')

  return (
    <>
      <PageHeader title={t('settingsTitle')} subtitle={t('settingsSubtitle')} />
      <Card>
        <CardContent>
          <SettingsPanel />
        </CardContent>
      </Card>
    </>
  )
}

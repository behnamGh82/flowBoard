import { Card, CardContent } from '@mui/material'
import { PageHeader } from '@/components/ui/PageHeader'
import { SettingsPanel } from '@/features/settings'

export const SettingsPage = () => (
  <>
    <PageHeader title="Settings" subtitle="Customize your workspace preferences" />
    <Card>
      <CardContent>
        <SettingsPanel />
      </CardContent>
    </Card>
  </>
)

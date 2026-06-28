import { PageHeader } from '@/components/ui/PageHeader'
import { DashboardOverview } from '@/features/dashboard'

export const DashboardPage = () => (
  <>
    <PageHeader title="Dashboard" subtitle="Overview of your workspace activity" />
    <DashboardOverview />
  </>
)

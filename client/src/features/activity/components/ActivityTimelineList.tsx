import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/common/EmptyState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ActivityTimelineItemCard } from '@/features/activity/components/ActivityTimelineItemCard'
import { useActivityTimeline } from '@/features/activity/hooks/useActivityTimeline'

export const ActivityTimelineList = () => {
  const { t } = useTranslation(['activity', 'pages'])
  const { data, isLoading, isError } = useActivityTimeline()

  if (isLoading) return <LoadingSpinner />

  if (isError || !data?.data.length) {
    return (
      <EmptyState
        title={t('pages:activityTimelineEmptyTitle')}
        description={t('pages:activityTimelineEmptyDescription')}
      />
    )
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">{t('activity:recentActivity')}</Typography>
      {data.data.map((item) => (
        <ActivityTimelineItemCard key={item._id} item={item} />
      ))}
    </Stack>
  )
}

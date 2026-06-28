import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/common/EmptyState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { CalendarEventCard } from '@/features/calendar/components/CalendarEventCard'
import { useCalendarEvents } from '@/features/calendar/hooks/useCalendarEvents'

export const CalendarOverview = () => {
  const { t } = useTranslation(['calendar', 'pages'])
  const start = dayjs().startOf('month').toISOString()
  const end = dayjs().endOf('month').toISOString()
  const { data, isLoading, isError } = useCalendarEvents({ start, end })

  if (isLoading) return <LoadingSpinner />

  if (isError || !data?.length) {
    return (
      <EmptyState
        title={t('pages:calendarEmptyTitle')}
        description={t('pages:calendarEmptyDescription')}
      />
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('calendar:monthlyOverview')}
            </Typography>
            <Grid container spacing={1}>
              {Array.from({ length: dayjs().daysInMonth() }, (_, index) => {
                const day = dayjs().startOf('month').add(index, 'day')
                const dayEvents = data.filter((event) => dayjs(event.start).isSame(day, 'day'))

                return (
                  <Grid key={day.toISOString()} size={{ xs: 6, sm: 3, md: 2 }}>
                    <Card variant="outlined" sx={{ minHeight: 88 }}>
                      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Typography variant="caption" color="text.secondary">
                          {day.format('D')}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                          {dayEvents.length ? `${dayEvents.length} event(s)` : '-'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h6">{t('calendar:upcomingEvents')}</Typography>
          {data.map((event) => (
            <CalendarEventCard key={event._id} event={event} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  )
}

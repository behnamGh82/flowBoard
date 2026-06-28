import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { CalendarEvent, CalendarEventType } from '@/types'
import { formatDate } from '@/utils/formatDate'

interface CalendarEventCardProps {
  event: CalendarEvent
}

const eventTypeLabels: Record<CalendarEventType, string> = {
  task_due: 'eventTypeTaskDue',
  project_milestone: 'eventTypeProjectMilestone',
  meeting: 'eventTypeMeeting',
}

export const CalendarEventCard = ({ event }: CalendarEventCardProps) => {
  const { t } = useTranslation('calendar')

  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {event.title}
            </Typography>
            <Chip label={t(eventTypeLabels[event.type])} size="small" />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {event.start ? formatDate(event.start, 'MMM D, YYYY') : t('noDate')}
          </Typography>
          {event.description && (
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

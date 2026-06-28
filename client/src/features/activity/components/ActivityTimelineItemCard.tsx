import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { ActivityAction, ActivityTimelineItem, User } from '@/types'
import { formatRelative } from '@/utils/formatDate'
import { getInitials } from '@/utils/helpers'

interface ActivityTimelineItemCardProps {
  item: ActivityTimelineItem
}

const actionLabels: Record<ActivityAction, string> = {
  project_created: 'projectCreated',
  task_created: 'taskCreated',
  task_updated: 'taskUpdated',
  task_moved: 'taskMoved',
  comment_added: 'commentAdded',
  user_joined: 'userJoined',
}

const getActor = (actor: ActivityTimelineItem['actor']) =>
  typeof actor === 'object' ? (actor as User) : null

export const ActivityTimelineItemCard = ({ item }: ActivityTimelineItemCardProps) => {
  const { t } = useTranslation('activity')
  const actor = getActor(item.actor)

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {actor ? getInitials(actor.name) : '?'}
          </Avatar>
          <Stack spacing={0.5} sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {actor?.name ?? t('unknownActor')}
            </Typography>
            <Typography variant="body2">{item.message || t(actionLabels[item.action])}</Typography>
            <Typography variant="caption" color="text.secondary">
              {formatRelative(item.createdAt)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

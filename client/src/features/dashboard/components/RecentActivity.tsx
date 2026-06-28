import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { formatRelative } from '@/utils/formatDate'

const activities = [
  {
    id: '1',
    key: 'activityMovedTask',
    user: 'Alice',
    task: 'API Integration',
    time: new Date().toISOString(),
  },
  {
    id: '2',
    key: 'activityCommented',
    user: 'Bob',
    task: 'Design Review',
    time: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    key: 'activityCreatedProject',
    user: 'Carol',
    project: 'Mobile App',
    time: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    key: 'activityAssignedTask',
    user: 'Dave',
    task: 'Bug Fix #42',
    assignee: 'Alice',
    time: new Date(Date.now() - 86400000).toISOString(),
  },
] as const

export const RecentActivity = () => {
  const { t } = useTranslation('dashboard')

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('recentActivity')}
        </Typography>
        <List disablePadding>
          {activities.map((item) => (
            <ListItem key={item.id} alignItems="flex-start" disableGutters sx={{ py: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 32, height: 32, fontSize: 12 }}>
                  {item.user[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={t(item.key, {
                  user: item.user,
                  task: 'task' in item ? item.task : '',
                  project: 'project' in item ? item.project : '',
                  assignee: 'assignee' in item ? item.assignee : '',
                })}
                secondary={formatRelative(item.time)}
                slotProps={{
                  primary: { variant: 'body2' },
                  secondary: { variant: 'caption' },
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

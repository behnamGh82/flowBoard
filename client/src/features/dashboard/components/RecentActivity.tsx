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
import { formatRelative } from '@/utils/formatDate'

const activities = [
  { id: '1', user: 'Alice', action: 'moved task "API Integration" to Done', time: new Date().toISOString() },
  { id: '2', user: 'Bob', action: 'commented on "Design Review"', time: new Date(Date.now() - 3600000).toISOString() },
  { id: '3', user: 'Carol', action: 'created project "Mobile App"', time: new Date(Date.now() - 7200000).toISOString() },
  { id: '4', user: 'Dave', action: 'assigned "Bug Fix #42" to Alice', time: new Date(Date.now() - 86400000).toISOString() },
]

export const RecentActivity = () => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Recent Activity
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
              primary={item.action}
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

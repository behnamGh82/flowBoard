import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, Typography, Chip, Box } from '@mui/material'
import type { Task } from '@/types'
import { priorityColors, statusLabels } from '@/utils/helpers'
import { formatDate, isOverdue } from '@/utils/formatDate'

interface TaskCardProps {
  task: Task
  isDragging?: boolean
}

export const TaskCard = ({ task, isDragging = false }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task._id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ '&:active': { cursor: 'grabbing' } }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
          {task.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip
            label={task.priority}
            size="small"
            sx={{
              bgcolor: `${priorityColors[task.priority]}20`,
              color: priorityColors[task.priority],
            }}
          />
          <Chip label={statusLabels[task.status]} size="small" variant="outlined" />
          {task.storyPoints != null && (
            <Chip label={`${task.storyPoints} SP`} size="small" variant="outlined" />
          )}
        </Box>
        {task.labels?.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
            {task.labels.slice(0, 3).map((label) => (
              <Chip key={label} label={label} size="small" />
            ))}
          </Box>
        )}
        {task.dueDate && (
          <Typography
            variant="caption"
            color={isOverdue(task.dueDate) ? 'error' : 'text.secondary'}
            sx={{ mt: 1, display: 'block' }}
          >
            Due {formatDate(task.dueDate)}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

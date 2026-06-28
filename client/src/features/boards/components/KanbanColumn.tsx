import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'
import { TaskCard } from '@/features/tasks/components/TaskCard'
import type { BoardColumn, Task } from '@/types'

interface KanbanColumnProps {
  column: BoardColumn
  tasks: Task[]
  onAddTask?: (columnId: string) => void
}

export const KanbanColumn = ({ column, tasks, onAddTask }: KanbanColumnProps) => {
  const { t } = useTranslation('pages')
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        minWidth: 300,
        maxWidth: 300,
        bgcolor: isOver ? 'action.hover' : 'background.paper',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        transition: 'background-color 0.2s',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {column.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            {tasks.length}
          </Typography>
          {onAddTask && (
            <Tooltip title={t('addTask')}>
              <IconButton size="small" onClick={() => onAddTask(column.id)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </Box>
      </SortableContext>
    </Paper>
  )
}

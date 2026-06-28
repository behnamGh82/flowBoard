import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Box, Typography, Paper } from '@mui/material'
import { TaskCard } from '@/features/tasks/components/TaskCard'
import type { BoardColumn, Task } from '@/types'

interface KanbanColumnProps {
  column: BoardColumn
  tasks: Task[]
}

export const KanbanColumn = ({ column, tasks }: KanbanColumnProps) => {
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
        <Typography variant="caption" color="text.secondary">
          {tasks.length}
        </Typography>
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

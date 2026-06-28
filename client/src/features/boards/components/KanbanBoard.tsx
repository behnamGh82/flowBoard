import { useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { Box } from '@mui/material'
import { useState } from 'react'
import { KanbanColumn } from '@/features/boards/components/KanbanColumn'
import { TaskCard } from '@/features/tasks/components/TaskCard'
import type { Board, Task } from '@/types'

interface KanbanBoardProps {
  board: Board
  tasks: Task[]
  onTaskMove?: (taskId: string, columnId: string, order: number) => void
  onAddTask?: (columnId: string) => void
}

export const KanbanBoard = ({ board, tasks, onTaskMove, onAddTask }: KanbanBoardProps) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  const columnIds = useMemo(() => new Set(board.columns.map((c) => c.id)), [board.columns])

  const tasksByColumn = useMemo(() => {
    const map = new Map<string, Task[]>()
    board.columns.forEach((col) => map.set(col.id, []))
    tasks.forEach((task) => {
      const columnId = map.has(task.columnId) ? task.columnId : 'backlog'
      const list = map.get(columnId) ?? []
      list.push(task)
      map.set(columnId, list)
    })
    map.forEach((list, key) => {
      map.set(key, list.sort((a, b) => a.order - b.order))
    })
    return map
  }, [board.columns, tasks])

  const resolveColumnId = (overId: string): string | null => {
    if (columnIds.has(overId)) return overId
    const overTask = tasks.find((t) => t._id === overId)
    return overTask?.columnId ?? null
  }

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t._id === event.active.id)
    setActiveTask(task ?? null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event
    if (!over) return

    const columnId = resolveColumnId(String(over.id))
    if (!columnId) return

    const taskId = String(active.id)
    const columnTasks = tasksByColumn.get(columnId) ?? []
    onTaskMove?.(taskId, columnId, columnTasks.length)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          minHeight: 520,
        }}
      >
        {board.columns
          .sort((a, b) => a.order - b.order)
          .map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByColumn.get(column.id) ?? []}
              onAddTask={onAddTask}
            />
          ))}
      </Box>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}

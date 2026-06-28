import { useEffect, useState } from 'react'
import { MenuItem, Stack } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppInput } from '@/components/ui/AppInput'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/common/EmptyState'
import { KanbanBoard } from '@/features/boards/components/KanbanBoard'
import { TaskFormDialog } from '@/features/tasks/components/TaskFormDialog'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { useBoardsByProject } from '@/features/boards/hooks/useBoards'
import { useMoveTask, useTasksByBoard } from '@/features/tasks/hooks/useTasks'
import { DEFAULT_BOARD_COLUMNS } from '@/constants/board'

export const BoardWorkspace = () => {
  const { t } = useTranslation('pages')
  const [searchParams] = useSearchParams()
  const projectFromUrl = searchParams.get('project') ?? ''
  const { data: projectsData, isLoading: projectsLoading, isError: projectsError, refetch } = useProjects()
  const [projectId, setProjectId] = useState(projectFromUrl)
  const [boardId, setBoardId] = useState('')
  const [taskDialog, setTaskDialog] = useState<{ open: boolean; columnId: string }>({
    open: false,
    columnId: 'backlog',
  })

  useEffect(() => {
    if (projectFromUrl) {
      setProjectId(projectFromUrl)
      setBoardId('')
    }
  }, [projectFromUrl])

  const selectedProjectId = projectId || projectsData?.data[0]?._id || ''
  const { data: boards, isLoading: boardsLoading } = useBoardsByProject(selectedProjectId)
  const selectedBoardId = boardId || boards?.[0]?._id || ''
  const { data: tasks, isLoading: tasksLoading } = useTasksByBoard(selectedBoardId)
  const moveTask = useMoveTask()

  if (projectsLoading) return <LoadingScreen />
  if (projectsError) return <ErrorState onRetry={() => refetch()} />
  if (!projectsData?.data.length) {
    return <EmptyState title={t('boardsEmptyTitle')} description={t('boardsEmptyDescription')} />
  }

  const board = boards?.find((b) => b._id === selectedBoardId) ?? boards?.[0]
  const boardWithDefaults = board
    ? { ...board, columns: board.columns?.length ? board.columns : DEFAULT_BOARD_COLUMNS }
    : null

  if (boardsLoading || tasksLoading) return <LoadingScreen />

  if (!boardWithDefaults) {
    return <EmptyState title={t('boardsEmptyTitle')} description={t('boardsEmptyDescription')} />
  }

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <AppInput
          select
          label={t('projectsTitle')}
          value={selectedProjectId}
          onChange={(e) => {
            setProjectId(e.target.value)
            setBoardId('')
          }}
          sx={{ minWidth: 220 }}
        >
          {projectsData.data.map((project) => (
            <MenuItem key={project._id} value={project._id}>
              {project.name}
            </MenuItem>
          ))}
        </AppInput>

        <AppInput
          select
          label={t('boardsTitle')}
          value={selectedBoardId}
          onChange={(e) => setBoardId(e.target.value)}
          sx={{ minWidth: 220 }}
        >
          {(boards ?? []).map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </AppInput>
      </Stack>

      <KanbanBoard
        board={boardWithDefaults}
        tasks={tasks ?? []}
        onTaskMove={(taskId, columnId, order) => {
          moveTask.mutate({ id: taskId, columnId, order })
        }}
        onAddTask={(columnId) => setTaskDialog({ open: true, columnId })}
      />

      <TaskFormDialog
        open={taskDialog.open}
        onClose={() => setTaskDialog((prev) => ({ ...prev, open: false }))}
        boardId={selectedBoardId}
        projectId={selectedProjectId}
        columnId={taskDialog.columnId}
      />
    </Stack>
  )
}
